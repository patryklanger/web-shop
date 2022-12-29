FROM adoptopenjdk/openjdk11:alpine-jre
ARG JAR_FILE=target/productService-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} productService.jar
ENTRYPOINT ["java","-jar","productService.jar"]
