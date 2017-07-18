FROM node:7.10.0-slim

# Create app directory
RUN mkdir -p /chibaka-app
WORKDIR /chibaka-app

# Install app dependencies
COPY package.json /chibaka-app/package.json
RUN cd/chibaka-app; npm install --quiet

# Set required environment variables
ENV NODE_ENV production

# Bundle app source
COPY . /chibaka-app

EXPOSE 3006

CMD [ "node", "/chibaka-app/server.js", ";", "npm", "test" ]
