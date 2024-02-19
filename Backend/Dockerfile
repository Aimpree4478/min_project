FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 500

CMD ["npm", "start"]

