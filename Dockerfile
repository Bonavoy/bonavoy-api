FROM node:14-alpine
WORKDIR /app
COPY . .
EXPOSE 443
RUN yarn
RUN yarn build
CMD [ "yarn", "start" ]
