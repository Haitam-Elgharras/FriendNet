# Host port and container port
- The container port is not the host port even if the container port is 3000, the host port is 3000. so we need to map the container port to the host port.

# Security fails if we leave the container with the root user
- We need to create a user in the container and run the app with that user.
for that we need add the following lines to Dockerfile:
`RUN addgroup app && adduser -S -G app app`
`USER app`

# default CMD after build the image
- We can supply a default command to be executed when the container starts. for example :
`CMD npm start`

# the difference between CMD and RUN
- RUN is a build time instruction, it is executed in the image build time.
- CMD is a run time instruction, it is executed when the container starts.

# The difference between CMD shell and CMD exec
- it's a best practice to use CMD exec instead of CMD shell because it runs the command directly without creating another shell process, so it makes cleaning containers easier.

# The difference between ENTRYPOINT and CMD
- ENTRYPOINT is like CMD exec but it can't be overridden by default, if we need to override it we need to use the `--entrypoint` flag. in other hand CMD can be overridden by default.


# Free up space
- To remove all stopped containers:
`docker container prune`

- To remove all unused images (dangling images):
`docker image prune`

- delete a container:
`docker rm <container_id>`

- delete an image:
`docker rmi <image_id>`

## Tagging images
- Tags are used for the versioning of the images, for example:
`docker build -t <imagename>:<tag> .`
- a tag can be a version number like 3.0.0 or a build number like 73 etc. and it can be configured in the CI/CD pipeline to be incremented automatically.
- to retag an image: 
`docker tag <old_image_name>:<old_tag> <new_image_name>:<new_tag>`
- remove a tag:
`docker image remove <image_name>:<tag>`
- upgrade to latest tag:
`docker tag <image_name>:<tag> <image_name>:latest` or `docker tag imageid <image_name>:latest`


# Pushing images to Docker Hub
first we build the image then we need to tag it with the docker hub username and the repository name then we need to login to the docker hub and push the image.
`docker image tag <image_name>:<tag> <docker_hub_username>/<repository_name>:<tag>`
`docker login`
`docker push <docker_hub_username>/<repository_name>:<tag>`

example:
`docker image tag friendnetserver:2 haitamelgharras/friendnet_server:2`
`docker login`
`docker push haitamelgharras/friendnet_server:2`

# Saving and loading images
- To save an image to a file:
`docker save -o <filename>.tar <image_name>:<tag>`
example:
`docker save -o friendnetsrv.tar friendnetserver:2`
- To load an image from a file:
`docker load -i <filename>.tar`
example:
`docker load -i friendnetsrv.tar`
- Note that .tar is a compressed file like .zip in windows.

- mount a drive:
sudo mount -t drvfs E: /mnt/e

# To learn more about any command
`docker <command> --help`



