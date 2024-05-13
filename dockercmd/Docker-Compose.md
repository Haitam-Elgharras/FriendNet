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