./mvnw clean package -DskipTests
docker build -t product-service .
docker image tag product-service patryklanger/product-service:latest
docker image push patryklanger/product-service:latest 