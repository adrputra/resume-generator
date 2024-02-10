# Use an official Node.js runtime as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
RUN yarn install

# Copy the entire project to the working directory
COPY . .

# Expose the desired port
# ARG PORT
EXPOSE 3002

# Define the command to run the application
RUN npm run build

RUN mkdir -p ./build/ui
RUN mv ./build/static ./build/ui
RUN mv ./build/assets ./build/ui
RUN mv ./build/favicon ./build/ui

CMD [ "npx", "serve", "-s", "build", "-l", "3002"]
