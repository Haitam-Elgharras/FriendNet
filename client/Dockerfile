FROM node:20.3.0-alpine3.17
WORKDIR /app
COPY . . 
RUN npm install

# Note that alpine doesnt have apt it uses apk

# set env
ENV PORT=3000