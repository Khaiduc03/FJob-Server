# node version
FROM node:18.16.0-alpine

# set working directory
WORKDIR /app

# copy package.json
COPY . ./

# install dependencies
RUN npm install -g npm@9.7.1
RUN npm cache clean --force
RUN npm install

# expose port
EXPOSE 8000

# start app

CMD ["npm", "start", "dev"]
