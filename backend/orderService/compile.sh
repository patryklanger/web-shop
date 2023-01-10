./mvnw clean package -DskipTests
docker build -t order-service .
docker image tag order-service patryklanger/order-service:latest
docker image push patryklanger/order-service:latest 