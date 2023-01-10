FROM adoptopenjdk/openjdk11:alpine-jre
ARG JAR_FILE=target/orderService-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} orderService.jar
ENTRYPOINT ["java","-jar","orderService.jar"]
