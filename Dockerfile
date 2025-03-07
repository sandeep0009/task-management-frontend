FROM node:20-alpine

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

COPY  . .

EXPOSE 5173

CMD ["npm","run", "dev"]