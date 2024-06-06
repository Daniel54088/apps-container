FROM node:20.12.2 as builder

WORKDIR /app
COPY package*.json ./
RUN npm install --save-dev eslint
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm","run","start" ]

