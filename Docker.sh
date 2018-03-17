# Docker - platform for containerization
# version: 17.12.0-ce

# Image - read-only template with instructions for creating a docker container.
# Container - runnable instance of an image.

################################################################################
# Dockerfile - config defining the steps needed to create the image and run it.
# Each instruction in a Dockerfile creates a layer in the image. When you change
# the Dockerfile and rebuild the image, only those layers which have changed
# are rebuilt.

FROM <parent_image>:<version>
RUN <shellstr>  # run command (shell form)
RUN [<cmdarg>...]  # exec form

ARG <name>=<default>  # variable that can be passed at build time
	# using `--build-arg <name>=<value>` and can be used inside
	# Dockerfile as `$name`
ENV <name> <value>

EXPOSE <port>...  # local ports

WORKDIR /<path>       # set cwd
COPY <path> /<path>   # copy files into container

CMD <shellstr>  # default command to run app (shell form)
CMD [<cmdarg>...]  # exec form

################################################################################

docker info

docker build -t <name>:<tag> <src_path>  # build new image with version <tag>

docker run <image> [<cmd arg...>]  # run new container
	# <image> can be <usename>/<repository>:<tag> to pull from repo and run
	-v <volume>:/<path>  # attach storage
		# to run container inside container use host docker daemon:
		# -v /var/run/docker.sock:/var/run/docker.sock
	-p <foreign>:<inner>  # map ports
	--network bridge|host|overlay|macvlan|none  # connect to network
	--name <name>  # specify name for new container
	-d  # detached mode (run in background)
	-i  # interactive
	-t  # allocate pseudo tty
	-a stdin|stdout|stder  # attach to stdin, stdout and/or stderr
	--rm  # automatically remove when exits

docker ps  # list running containers
docker start <container>
	-i  # interactive
	-a  # attach stdout and stderr and forward signals
docker attach <container>  # back to foreground
docker exec <container> <cmd arg...>  # execute in running container
docker stop <container>
docker kill <container>

docker image ls
	-a  # all (default hides intermediate images)
docker image rm <image>
docker image prune  # remove all dangling images
	-f  # without prompt

docker container ls
	-a  # all (default hides stopped)
docker container rm <container>
docker container prune  # remove all stopped containers
	-f

docker volume create <volume>
	# volumes stored in /var/lib/docker/volumes/<volume-name>
docker volume ls
docker volume rm <volume>

docker cp <path>/. <container>:/<path>  # copy files from host to container

################################################################################
# Dockerfile example:

FROM debian:stretch

RUN apt-get update -y
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
