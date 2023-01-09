FROM adoptopenjdk/openjdk11:alpine-jre
ARG JAR_FILE=target/auth-service-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} authService.jar
ENTRYPOINT ["java","-jar","authService.jar"]
