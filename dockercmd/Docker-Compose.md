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
- if the image is not built, it will build it first and then run it.

- Build and start the app in the background:
```bash
docker-compose up -d
```

## Free up the resources (delete the containers)
```bash
docker-compose down
```
- Note that the images are not deleted, only the containers.