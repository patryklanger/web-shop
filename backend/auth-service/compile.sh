./mvnw clean package -DskipTests
docker build -t web-shop-api-gateway .
docker image tag web-shop-auth-service patryklanger/web-shop-api-gateway:latest
docker image push patryklanger/web-shop-api-gateway:latest