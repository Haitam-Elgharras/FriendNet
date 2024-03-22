# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


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



