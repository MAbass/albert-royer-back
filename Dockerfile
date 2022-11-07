# Base image
FROM node:16

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Bundle app source
COPY . .

# Install app dependencies
RUN yarn install

# Creates a "dist" folder with the production build
RUN yarn run build:stag

# Start the server using the staging build
CMD [ "npm", "run", "start:stag:linux" ]
