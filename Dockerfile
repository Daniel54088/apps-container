FROM node:20.12.2 as builder

WORKDIR /src
COPY package*.json ./
COPY prisma ./
RUN npm install  eslint
RUN npx prisma generate
RUN npm install --production
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm","run","start" ]

