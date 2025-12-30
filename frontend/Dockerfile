FROM node:22-alpine AS build

WORKDIR /app/frontend

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

FROM nginx:stable-alpine

COPY --from=build app/frontend/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]