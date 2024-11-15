FROM node:latest AS build
WORKDIR /react-docker
COPY package.json package-lock.json* /react-docker/
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "run", "dev" ,"--",  "--host"]