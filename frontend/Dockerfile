FROM node:20 AS build-stage

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM httpd:2.4.62

COPY --from=build-stage /app /usr/local/apache2/htdocs/

EXPOSE 80

CMD ["httpd-foreground"]
