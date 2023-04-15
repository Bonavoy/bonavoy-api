FROM node:14-alpine
WORKDIR /app
COPY . .
EXPOSE 8080
RUN yarn
RUN yarn build
CMD [ "yarn", "start" ]
