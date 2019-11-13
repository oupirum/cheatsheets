# Docker - platform for containerization
# version: 19.03

# Image - read-only template with instructions for creating a docker container.
# Container - runnable instance of an image.

# After installation need to add user to docker group
sudo usermod -aG docker $(whoami)

################################################################################

docker info  # show details about installed docker, images, containers
docker inspect <name|id>  # low-level information in json format

docker build -t <name>:<tag> <src_path>  # build new image with version <tag>

docker run <image> [<cmd arg...>]  # run new container
	# <cmd args...> - to override CMD or add ENTRYPOINT arguments
	# <image> can be <usename>/<repository>:<tag> to pull from repo and run
	-p <foreign>:<inner>  # map ports
	--network bridge|host|overlay|macvlan|none  # connect to network
	--name <name>  # specify name for new container
	-d  # detached mode (run in background)
	-i  # interactive
	-t  # allocate pseudo tty
	-a stdin|stdout|stder  # attach to stdin, stdout and/or stderr
	--rm  # automatically remove when exits

	-v|--volume <volume|host_path>:<mount_path>  # attach storage
	--mount <options>  # attach storage (more explicit syntax)
		# options: comma-separated key=value pairs
			type=bind|volume|tmpfs
			source=<host_path>
			destination=<mount_path>
			readonly=true
			bind-propagation=rprivate|private|rslave|slave|rshared|shared
				# whether or not sub-mounts can be propagated to replicas
				# r - recursive

docker ps  # list running containers
docker logs <container>    # fetch logs of a container
	-f|--follow  # follow log output
	--tail <n>  # show only <n> last lines
	-t|--timestamps  # show timestamps
	--since <time>  # show logs since <time> (e.g. 2013-01-02T13:23:37)
		# or relative (e.g. 42m for 42 minutes)
	--details  # show extra deails provided to logs (env vars)

docker start <container>   # run stopper container
	-i  # interactive
	-a  # attach stdout and stderr and forward signals
docker exec <container> <cmd arg...>  # execute in running container
	-d  # detached mode
	-w <path>  # set working directory
	-i  # interactive
	-t  # allocate pseudo tty
	-e <key>=<val>  # set environment variable
docker attach <container>  # back to foreground
docker stop <container>    # gracefully stop running container
docker kill <container>    # force stop

docker image ls  # list images
	-a  # all (default hides intermediate images)
docker image rm <image>    # remove image
docker image prune         # remove all dangling images
	-f  # without prompt

docker container ls  # list containers
	-a  # all (default hides stopped)
docker container rm <container>  # remove container
	-v  # with associated volumes
docker container prune           # remove all stopped containers
	-f

docker volume create <volume>  # create storage
	# volumes stored in /var/lib/docker/volumes/<volume-name>
docker volume ls  # list volumes
docker volume rm <volume>  # remove volume

# copy files from host to container
docker cp <file_path> <container>:/<path>  # copy file into dir or rewrite file
docker cp <dir_path> <container>:/<dir_path>
	# if exists: create subdirectory and copy contents into it
	# if does not exist: create dir and copy contents into it
docker cp <dir_path>/. <container>:/<dir_path>  # copy dir contents into dir

################################################################################
# Dockerfile - config defining the steps needed to create the image and run it.
# Each instruction in a Dockerfile creates a layer in the image. When you change
# the Dockerfile and rebuild the image, only those layers which have changed
# are rebuilt.

FROM <parent_image>:<version>  # specify parent layer

USER <user>[:<group>]  # set user to use when running the image and
	# for all following RUN, CMD, ENTRYPOINT

RUN <shellstr>  # run command (shell form)
RUN [<cmdarg>...]  # exec form

ARG <name>=<default>  # variable that can be passed at build time
	# using `--build-arg <name>=<value>` and can be used inside
	# Dockerfile as `$name`
ENV <name> <value>  # environment variable

EXPOSE <port>...  # inform that container listens port(s) at runtime

WORKDIR /<path>       # set working directory
COPY <path> /<path>   # copy files into container
	# The directory itself is not copied, just its contents.

ENTRYPOINT [<cmd> <args>...]  # allows to configure a container that will
	# run as an executable

CMD <shellstr>  # default command or additional arguments for ENRTYPOINT
CMD [<cmd> <arg>...]  # exec form

################################################################################
# Dockerfile example:

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



################################################################################
# docker-compose
# version: 1.24

# Compose is a tool for defining and running multi-container Docker applications.
# Use a YAML file to configure your application’s services, then, with a single
# command, create and start all the services.
# Features:
	# Multiple isolated environments on a single host
	# Preserve volume data when containers are created
	# Only recreate containers that have changed
	# Variables and moving a composition between environments

docker-compose
	-f|--file <path>  # alternative compose file
		# default: ./docker-compose.yml
	--project-directory <path>  # alternative working directory
		# default: path to the compose file
	-p|--project-name <name>  # directory name by default
	--log-level DEBUG|INFO|WARNING|ERROR|CRITICAL

	build  # build or rebuild services
		--compress  # gzip compress the build context
		--force-rm  # remove intermediate containers
		-m|--memory <n>  # set memory limit
		--build-arg <key>=<val>  # build time variables

	run <service> [<cmd args...>]  # start service and execute command
		-d|--detach     # detached mode
		--name <name>   # assign name to the container
		--no-deps       # don't start linked services
		-e <key>=<val>  # set environment variable
		-w|--workdir    # set working directory
		-v|--volume <volume>   # bind mount a volume
		--rm     # remove container after run

	up [<service>...]  # build, (re)create and start services
		-d  # detached mode
		--no-deps  # don't start linked services
		--build    # build images before starting containers
		--scale <service>=<n>  # scale <service> to <n> instances
	down  # stop and remove containers
		-v|--volumes

	ps  # list running containers
		--services
	logs [<service>...]
		-f|--follow  # follow log output
		--tail <n>  # show <n> last lines
		-t|--timestamps  # show timestamps
	top [<service>...]  # display the running processes

	exec <service> <cmd args...>  # execute command in running service
		-d|--detach  # detached mode
		--index <n>  # index of the container if there are multiple instances
		-e|--env <key>=<val>  # set environment variable
		-w  # workdir for this command
	pause [<service>...]
	unpause [<service>...]
	start [<service>...]  # start existing container(s)
	stop [<service>...]
	kill [<service>...]  # send a signal to the service(s) (default: SIGKILL)
		-s <signal>
	restart [<service>...]

################################################################################
# docker-compose.yml example:

version: "3.7"
services:
	webapp:      # service name
		build: ./        # path to Dockerfile
		container_name: web
		ports:  # expose ports <host>:<container>
			- "8000:8000"
		volumes:
			- "./:/app/"     # mount project directory to /app/ inside container
		environment:
			APP_ENV: dev
		command: "python manage.py runserver"  # override the default CMD
		depends_on:  # specify service's dependencies
			- redis
		dns:
			- 8.8.8.8
		env_file:
			- .env
		restart: on-failure  # auto restart policy
			# available: no, always, on-failure, unless-stopped
		networks:  # networks to join (referencing entries of top-level networks)
			- frontend
	db:
		build:
			context: ./dir
			dockerfile: Dockerfile-alternate
			args:    # build time arguments
				key: val
		entrypoint: ./start_db.sh  # override the default ENTRYPOINT
		network_mode: bridge
	redis:
		image: "redis:alpine"
networks:
	frontend:
		driver: bridge
		name: frontend
