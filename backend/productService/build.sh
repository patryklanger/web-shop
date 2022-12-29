docker build -t product-service-web-shop:1.0 .
docker tag product-service-web-shop:1.0 patryklanger/web-shop-product-service
docker push patryklanger/web-shop-product-service