./mvnw clean package -DskipTests
docker build -t web-shop-api-gateway2 .
docker image tag web-shop-auth-service patryklanger/web-shop-api-gateway2:latest
docker image push patryklanger/web-shop-api-gateway2:latest