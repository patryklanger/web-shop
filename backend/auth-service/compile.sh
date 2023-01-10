./mvnw clean package -DskipTests
docker build -t web-shop-auth-service .
docker image tag web-shop-auth-service patryklanger/web-shop-auth-service:latest
docker image push patryklanger/web-shop-auth-service:latest