# Docker cheatsheet

`Docker` is a platform for containerization.<br/>
Version: 19.03<br/>

`Image`: read-only template with instructions for creating a docker container.<br/>
`Container`: runnable instance of an image.<br/>

---
After installation need to add user to docker group:
```sh
sudo usermod -aG docker $(whoami)
```

---
### Table of contents:
* [Docker CLI](#docker-cli)
	* [Info](#docker-cli-info)
	* [Images](#docker-cli-images)
	* [Containers](#docker-cli-containers)
	* [Volumes](#docker-cli-volumes)
	* [Copy files into container](#docker-cli-copy-files)
* [Dockerfile](#dockerfile)
	* [Commands](#dockerfile-commands)
	* [Example](#dockerfile-example)
* [docker-compose](#docker-compose)
	* [CLI](#docker-compose-cli)
	* [docker-compose.yml](#docker-compose-yml)
* [Dump and restore Postgres DB](#dump-restore-pg)


===================================================================================
# Docker CLI <a id="docker-cli"></a>

### Info <a id="docker-cli-info"></a>

View details about installed docker, images, containers:
```sh
docker info
```

Get low-level info in json:
```sh
docker inspect <name|id>
```

-----------------------------------------
### Images <a id="docker-cli-images"></a>

Build a new image with version tag:
```sh
docker build -t <name>:<tag> <src_path>
```

List images:
```sh
docker image ls
	-a  # All (include intermediate images)
```

Remove image:
```sh
docker image rm <image>
```

Remove all dangling images:
```sh
docker image prune
	-f  # Without prompt
```

------------------------------------------
### Containers <a id="docker-cli-containers"></a>

Run new container:
```sh
docker run <image> [<cmd> <arg>...]
	# where <image> can be <usename>/<repository>:<tag> to pull from repo and run
	# where <cmd> <arg>...: to override CMD or add ENTRYPOINT arguments

	-p <foreign>:<inner>  # Map ports
	--network bridge|host|overlay|macvlan|none  # Connect to network
	--name <name>  # Specify name for new container
	-d  # Detached mode (run in background)
	-i  # Interactive
	-t  # Allocate pseudo tty
	-a stdin|stdout|stder  # Attach to stdin, stdout and/or stderr
	--rm  # Automatically remove container when exits

	-v|--volume <volume|host_path>:<mount_path>  # Attach storage
	--mount <options>  # Attach storage (more explicit syntax)
		# <options>: comma-separated key=value pairs:
			type=bind|volume|tmpfs
			source=<host_path>
			destination=<mount_path>
			readonly=true
			bind-propagation=rprivate|private|rslave|slave|rshared|shared
				# whether or not sub-mounts can be propagated to replicas
				# r - recursive
```

Run existing stopped container:
```sh
docker start <container>
	-i  # Interactive
	-a  # Attach stdout and stderr and forward signals
```

Execute command in running container:
```sh
docker exec <container> <cmd arg...>
	-d  # Detached mode
	-w <path>  # Set working directory
	-i  # Interactive
	-t  # Allocate pseudo tty
	-e <key>=<val>  # Set environment variable
```

Connect to container's process:
```sh
docker attach <container>
	# Press Ctrl+p, Ctrl+q to detach
```

Stop container gracefully:
```sh
docker stop <container>
```

Force stop:
```sh
docker kill <container>
```

Fetch container logs:
```sh
docker logs <container>
	-f|--follow  # Follow log output
	--tail <n>  # Show only <n> last lines
	-t|--timestamps  # Show timestamps
	--since <time>  # Show logs since specified datetime, e.g., "2013-01-02T13:23:37"
		# Can be relative, e.g., "42m" for 42 minutes
	--details  # Show extra deails provided to logs (env vars)
```

List containers:
```sh
docker ps
	-a  # All (include stopped containers)
```

Remove container:
```sh
container rm <container>
	-v  # With associated volumes
```

Remove all stopped containers:
```sh
docker container prune
	-f  # Without prompt
```

--------------------------------------------------
### Volumes <a id="docker-cli-volumes"></a>

Create storage:
```sh
docker volume create <volume>
```
Volumes are stored in /var/lib/docker/volumes/<volume-name><br/>

List volumes:
```sh
docker volume ls
```

Remove volume:
```sh
docker volume rm <volume>
```

---
### Copy files into container <a id="docker-cli-copy-files"></a>

```sh
docker cp <file_path> <container>:/<path>
	# Copy file into dir, rewrite file if exists


docker cp <dir_path> <container>:/<dir_path>
	# If exists: create subdirectory and copy contents into it
	# If does not exist: create dir and copy contents into it

docker cp <dir_path>/. <container>:/<dir_path>
	# Copy dir contents into dir
```


===================================================================================
# Dockerfile <a id="dockerfile"></a>

Dockerfile is a config defining the steps needed to create the image and run it.<br/>
Each instruction in Dockerfile creates a layer in the image. <br/>
When you change the Dockerfile and rebuild the image, only those layers which have changed are rebuilt.<br/>
https://docs.docker.com/reference/dockerfile/<br/>

---
### Commands <a id="dockerfile-commands"></a>

Specify parent layer (base for image):
```
FROM <parent_image>:<version>
```

---
Specify a user under which container will run:
```
USER <user>[:<group>]
```
All the following `RUN`, `CMD`, `ENTRYPOINT` will be executed under this user too.

---
Set build time shell command:
```
RUN <cmd> <arg>...
```
or in *exec form* (json array):
```
RUN ["<cmd>", "<arg>", ...]
```

---
Set build time variable:
```
ARG <name>=<default>
```
Can be passed using `--build-arg <name>=<value>` and can be referenced in Dockerfile as `$name`.

Set environment variable:
```
ENV <name> <value>
```

---
Define listening ports:
```
EXPOSE <port>...
```
To inform that container will listen port(s) at runtime.

---
Set working directory:
```
WORKDIR /<path>
```

---
Copy files into container:
```
COPY <path> /<path>
```
The directory itself is not copied, only its contents.

---
Set run time entrypoint command:
```
ENTRYPOINT ["<cmd>", "<arg>", ...]
```
Allows to configure a container that will run as an executable.

---
Set default run time shell command or default arguments for ENTRYPOINT:
```
CMD <cmd> <arg>...
```
or in *exec form*:
```
CMD ["<cmd>", "<arg>", ...]
```
Will be executed when running a container from an image without additional arguments.<br/>
When `ENTRYPOINT` defined, `CMD` in *exec form* will be appended to `ENTRYPOINT`.

Common use case: define a base executable in `ENTRYPOINT` and additional overridable parameters in `CMD`.


------------------------------------------
### `Dockerfile` example <a id="dockerfile-example"></a>

```
FROM debian:stretch

RUN apt-get update -y

RUN apt-get install -y locales
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
	locale-gen
RUN locale-gen en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN apt-get install -y python3
RUN apt-get install -y python3-pip

RUN apt-get install -y \
	apt-transport-https \
	ca-certificates \
	curl \
	gnupg2 \
	software-properties-common
RUN curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg | apt-key add -
RUN apt-key fingerprint 0EBFCD88
RUN add-apt-repository \
	"deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
	$(lsb_release -cs) \
	stable"
RUN apt-get update -y
RUN apt-get install -y docker-ce

WORKDIR /app

COPY ./requirements.txt ./
RUN pip3 install -r ./requirements.txt

COPY ./* ./

CMD pytest -sv ./
```


===================================================================================
# docker-compose <a id="docker-compose"></a>

Version: 1.24<br/>

Compose is a tool for defining and running multi-container Docker applications.<br/>
Use a YAML file to configure your application’s services, then, with a single command, create and start all the services.<br/>

Features:
* Multiple isolated environments on a single host.
* Reserve volume data when containers are created.
* Recreate only containers which have changed.
* Variables and moving a composition between environments.

---
### CLI <a id="docker-compose-cli"></a>

```sh
docker-compose
	-f|--file <path>  # Alternative compose file
		# Default: "./docker-compose.yml"
		# Multiple files can be specified, so latter will extend previous
	--project-directory <path>  # Alternative working directory
		# Default: path to the compose file
	-p|--project-name <name>  # Default: directory name
	--log-level DEBUG|INFO|WARNING|ERROR|CRITICAL
```

### Subcommands

Build or rebuild services:
```sh
build
	--compress  # Compress (gzip) the build context
	--force-rm  # Remove intermediate containers
	-m|--memory <n>  # Set memory limit
	--build-arg <key>=<val>  # Build time variables
```

Start service and execute command:
```sh
run <service> [<cmd args...>]
	-d|--detach     # Detached mode
	--name <name>   # Assign name to the container
	--no-deps       # Don't start linked services
	-e <key>=<val>  # Set environment variable
	-w|--workdir <path>    # Set working directory
	-v|--volume <volume>   # Bind mount a volume
	--rm     # Remove container when exits
```

Build, (re)create and start services:
```sh
up [<service>...]
	-d  # Detached mode
	--no-deps  # Don't start linked services
	--build    # Build images before starting containers
	--scale <service>=<n>  # Scale <service> to <n> instances
```

Stop and remove containers:
```sh
down
	-v|--volumes
```

List running containers:
```sh
ps
	--services
```

Get logs:
```sh
logs [<service>...]
	-f|--follow  # Follow log output
	--tail <n>  # Show <n> last lines
	-t|--timestamps  # Show timestamps
```

View running processes:
```sh
top [<service>...]
```

Execute command in runnng service:
```sh
exec <service> <cmd args...>
	-d|--detach  # Detached mode
	--index <n>  # Index of the container if there are multiple instances
	-e|--env <key>=<val>  # Set environment variable
	-w <path> # Workdir for this command
```

Pause running container(s):
```sh
pause [<service>...]
unpause [<service>...]
```

Start exising container(s):
```sh
start [<service>...]
stop [<service>...]
restart [<service>...]
```

Send a signal to container(s)
```sh
kill [<service>...]
	-s <signal>  # SIGKILL by default
```

--------------------------------------------------
### `docker-compose.yml` <a id="docker-compose-yml"></a>

```yaml
version: "3.7"

services:
	webapp:      # Service name
		build: ./        # Path to Dockerfile
		container_name: web
		ports:  # Expose ports <host>:<container>
			- 8000:8000
		volumes:
			- ./:/app/     # Mount project directory to /app/ inside container
		environment:
			- APP_ENV=dev
		command: python manage.py runserver  # Override the default CMD
		depends_on:  # Specify service's dependencies
			- redis
		dns:
			- 8.8.8.8
		env_file:
			- .env
		restart: on-failure  # Auto restart policy
			# Possible values: "no", "always", "on-failure", "unless-stopped"
		networks:  # Networks to join (referencing entries of top-level networks)
			- frontend

		stdin_open: true  # To make an interactive shell available
		tty: true

	db:
		build:
			context: ./dir
			dockerfile: Dockerfile-alternate
			args:    # Build time arguments
				key: val
		entrypoint: ./start_db.sh  # Override the default ENTRYPOINT
		network_mode: bridge

	redis:
		image: redis:alpine

networks:
	frontend:
		driver: bridge
		name: frontend

my_volume:
	driver: local
	driver_opts:
		type: none
		device: ./path/to/host/dir
		o: bind
```


=================================================================================
# Dump and restore Postgres DB <a id="dump-restore-pg"></a>

### Manually:
```sh
docker exec -ti <container> pg_dumpall -c -U <pg-user> <file>.sql
cat <file>.sql | docker exec -i <container> psql -U <pg-user>
```

### Backup automatically within a given time interval:
docker-compose.yml:
```yaml
services:
	pgbackups:
		container_name: Backup
		image: prodrigestivill/postgres-backup-local
		restart: always
		volumes:
			- ./backup:/backups
		links:
			- db:db
		depends_on:
			- db
		environment:
			- POSTGRES_HOST=db
			- POSTGRES_DB=${DB_NAME}
			- POSTGRES_USER=${DB_USER}
			- POSTGRES_PASSWORD=${DB_PASSWORD}
			- POSTGRES_EXTRA_OPTS=-Z9 --schema=public --blobs
			- SCHEDULE=@every 0h30m00s
			- BACKUP_KEEP_DAYS=7
			- BACKUP_KEEP_WEEKS=4
			- BACKUP_KEEP_MONTHS=6
			- HEALTHCHECK_PORT=81
```
