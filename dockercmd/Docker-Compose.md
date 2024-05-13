# Docker Compose

## build a fully managed application
- To build an app with compose we run:
```bash
docker-compose build
```
- Without cache:
```bash
docker-compose build --no-cache
```


## Run the app's image in a container
```bash
docker-compose up
```
- if the image is not built, docker-compose will build it first and then run it.

- Build and start the app in the background:
```bash
docker-compose up -d
```

## Free up the resources (delete the containers)
```bash
docker-compose down
```
- Note that the images are not deleted, only the containers.


# Mongodb with Docker
- to use mongo container 
```bash
docker run --name my-mongo -d -p 27017:27017 mongo
```
Then use the interactive mode to connect to the container:
```bash
docker exec -it <container_id or name> /bin/bash
```
Then run the mongo shell:
```bash
mongosh
```

# ports vs expose
- ports:
1. Activates the container to listen for specified port(s) from the world outside of the docker (can be the same host machine or a different machine) AND is also accessible to the world inside Docker.
2. More than one port can be specified (that's why it's ports not port).
![alt text](image.png)

- expose:
1. Activates container to listen for a specific port only from the world inside of docker AND is not accessible to the world outside of Docker.
2. More than one port can be specified.
![alt text](image-1.png)

