FROM node:14-alpine

WORKDIR /usr/src/app
COPY package*.json /

ENV NODE_ENV=development
RUN npm install
COPY . .
CMD ["npm", "run", "start:orders"]
