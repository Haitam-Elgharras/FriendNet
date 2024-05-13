FROM node:20.3.0-alpine3.17

WORKDIR /app

# copy stable files first
COPY package*.json ./
RUN npm install

# Create the data directory for volume
RUN mkdir data

# Create a user with low privilages
RUN addgroup app && adduser -S -G app app
# all the commands after this will be run as the app user
USER app

# copy all files including overwriting the package*.json
COPY . . 

EXPOSE 3001

ENV MONGO_URI=mongodb://db:27017/SocialMedia
ENV PORT=3001
ENV JWT_SECRET=MY_JWT_SECRET

# cmd exec form
CMD ["npm", "start"]

# cmd shell form
# CMD npm start