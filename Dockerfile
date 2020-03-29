FROM node:12

WORKDIR /app

COPY ./package.json ./package.json

COPY ./package-lock.json ./package-lock.json

RUN npm i cross-env -g

RUN npm i --production

COPY ./ .

COPY ./.env ./.env

EXPOSE 3000

CMD ["npm", "start"]