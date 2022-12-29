FROM adoptopenjdk/openjdk11:alpine-jre
ARG JAR_FILE=target/discoveryService-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} discoveryService.jar
ENTRYPOINT ["java","-jar","discoveryService.jar"]
