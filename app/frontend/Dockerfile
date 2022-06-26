#FROM node:16 AS build-stage
#
#WORKDIR /usr/src/app
#
#COPY . .
#
#RUN npm ci
#RUN npm run build
#
#FROM nginx:1.20-alpine
#COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
#RUN rm /etc/nginx/conf.d/default.conf
#COPY nginx/nginx.conf /etc/nginx/conf.d
#EXPOSE 80
FROM node:alpine

WORKDIR /app

COPY package.json .
RUN npm install --fetch-timeout=6000000
COPY . .

CMD ["npm", "start"]