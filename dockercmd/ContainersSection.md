# Working with Containers

- To see running containers:
    ```bash
    docker ps
    ```
- To see all containers:
    ```bash
    docker ps -a
    ```

- To run a container in detached mode(Background):
    ```bash
    docker run -d <image_name>:<tag>
    ```

- Assosiate a name with the container:
    ```bash
    docker run -d --name <choice a name> <image_name>:<tag>
    ```

- To see the logs of detached container:
    ```bash
    docker logs <container_id>
    ```
- To follow the logs of detached container:
    ```bash
    docker logs -f <container_id>
    ```

- Publish a port: it maps a port in the host machine to a port in the container.
    ```bash
    docker run -d -p <host_port>:<container_port> <image_name>:<tag>
    ```
Note that the ports don't have to be the same.

- Execute a command in a running container:
    ```bash
    docker exec <container_name/id> <any os command>
    ```
example with a container named `myapp`:
    docker exec myapp ls
    docker exec -it myapp sh

- To stop or start a container:
    ```bash
    docker stop <container id/name>
    docker start <container id/name>
    ```
## difference between docker run/exec/start
- `docker run` is used to create a new container from an image and start it.
- `docker exec` is used to run a command in a running container.
- `docker start` is used to start a stopped container.

- Force remove a container:
    ```bash
    docker rm -f <container_id>
    ```
- search for a container by name:
    ```bash
    docker ps -a | grep < container_name / any prop >
    ```

## containers Filesystem
- Each container has its own filesystem, so we musn't store data in the container's filesystem because it will be lost when the container is removed.


## Volumes
- Volumes are used to persist data outside the container's filesystem, so even if the container is removed the data will be still there. also even if we delete the image and rebuild it the data will be still there.
- Volume allows us to share data between the host and other containers.
- To create a volume:
    ```bash
    docker volume create <volume_name>
    ```
- To inspect a volume:
    ```bash
    docker volume inspect <volume_name>
    ```

- To attach a volume to a container:
    ```bash
    docker run -d -v <volume_name>:<container_volume_path> <image_name>:<tag>
    ```
example with a container named `server` and a volume named `data`:
    ```bash
    docker run -d -v data:/app server 
    ```

## Copy files to and from a container
- From the container to the host:
    ```bash
    docker cp <container_id>:<container_file_path> <host_file_path>
    ```
example:
    ```bash
    docker cp server:/app/logs.txt .
    ```
    this will copy the logs.txt file from the server container to the host's current directory.

- From the host to the container:
    ```bash
    docker cp <host_file_path> <container_id>:<container_file_path>
    ```
example:
    ```bash
    docker cp logs.txt server:/app
    ```

- In general the cmd is
    ```bash
    docker cp <source> <destination>
    ```
    where the source and the destination can be a container id or name or a host file path.


## Sharing the source code with the container
- We can share the source code with the container so we don't have to rebuild the image every time we make a change in the source code in our development environment.
- To share the source code with the container:
    ```bash
    docker run -d -v $(pwd):<root_path_in_container> <image_name>:<tag>
    ```
    where `$(pwd)` is the current directory in the host machine.
    and `<root_path_in_container>` is the path in the container where we want to share the source code.
example:
    ```bash
    docker run -d -p 5001:3001 -v $(pwd):/app server
    ```

## Delete all containers && images
- start by removing all containers:
    ```bash
    docker rm -f $(docker container ls -aq)
    ```

- then remove all images:
    ```bash
    docker rmi -f $(docker image ls -aq)
    ```
