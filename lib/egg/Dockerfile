FROM node:12-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . ./

EXPOSE 7001

CMD ["npm","run","start"]