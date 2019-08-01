FROM node:11.15.0-alpine
WORKDIR /app
COPY ./build /app
COPY ./package.json /app
COPY ./yarn.lock /app
COPY ./config /app
COPY ./ecosystem.config.js /app
COPY ./tsconfig.json /app

ENV NODE_ENV production
EXPOSE 9000
RUN yarn config set registry https://registry.npm.taobao.org -g && yarn
CMD ["node", "build/index.js"]