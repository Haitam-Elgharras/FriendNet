## Dockerfile Explanation:

### Base Image Setup:

- Our application's base image will be Node, based on Alpine Linux.

```Dockerfile
FROM node:alpine
```

### Copying Application:

- Copies our application files into the `/app` directory within the container.

```Dockerfile
COPY . /app
```

### Setting Working Directory:

- Sets the `/app` directory as the working directory for subsequent instructions.

```Dockerfile
WORKDIR /app
```

### Running the Application:

- Specifies the command to run our application, in this case, `node /app/app.js`.

```Dockerfile
CMD node /app/app.js
```

## Docker Commands:

### Building the Image:

- Command to build the Docker image.
- Syntax: `docker build -t image-name image-directory`

```bash
docker build -t hello-docker .
```

### Viewing Images:

- Retrieves a list of Docker images on the system.

```bash
docker image ls
```

### 1. `docker run <name>`:

- Runs a Docker container using the specified image `<name>`.
- Starts the container in the background.
- Will pull the image from the repository if it does not exist locally.

### 2. `docker run -it <image-name>`:

- Runs a Docker container interactively (`-it`).
- Provides an interactive shell within the container for user interaction.

### 3. `docker ps`:

- Lists all currently running Docker containers.
- Provides information such as container ID, image used, command running, and status.

### 4. `docker ps -a`:

- Lists all Docker containers, including those that are not currently running (`-a`).
- Provides information on both running and stopped containers.

### `docker exec -it <container-id> bash`

- Open a new terminal in the same ubuntu image.
"# Docker" 


## Setting Environment Variables:
`ENV KEY=VALUE`
Example:
`ENV NODE_ENV=production`

Inspecting environment variables:
`printenv` or `echo $VARIABLE_NAME`

## delete a container or image
`docker rm <container-id>`
`docker rmi <image-id>`
