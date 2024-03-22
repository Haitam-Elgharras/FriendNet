FROM node:20.3.0-alpine3.17

WORKDIR /app

# copy stable files first
COPY package*.json ./
RUN npm install

# permissions for the node_modules
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# Create a user with low privilages
RUN addgroup app && adduser -S -G app app
# all the commands after this will be run as the app user
USER app

# copy the rest of the files
COPY . . 

# This is the port that the Container will listen on
EXPOSE 3000

# cmd exec form
CMD ["npm", "start"]


# Note that alpine doesnt have apt it uses apk
# set env
# ENV PORT=3000