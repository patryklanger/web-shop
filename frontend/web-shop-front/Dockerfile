# Stage 1
FROM node:14.15.4 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/web-shop-front /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
