FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3001

CMD ["yarn", "run", "run"]