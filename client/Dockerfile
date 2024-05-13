FROM node:20.3.0-alpine3.17

WORKDIR /app

# permissions for the node_modules this is to avoid permission errors
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

# Create a user with low privilages -S means 
RUN addgroup app && adduser -S -G app app

# Change ownership of node_modules to app user
RUN chown -R app:app /app/node_modules

# copy stable files first because each line in the Dockerfile creates a new layer
# and for optimization purposes, we need to node_modules to be cached so we don't need to rebuild this 
# layer everytime we make a change to the code even the deps are not changed
COPY package*.json ./
RUN npm install

# all the commands after this will be run as the app user
USER app

# copy the rest of the files
COPY . . 

# This is the port that the Container will listen on
EXPOSE 5173

# cmd exec form
# npm run dev
CMD ["npm", "run", "dev"]


# Note that alpine doesnt have apt it uses apk
# set env
ENV PORT=5173