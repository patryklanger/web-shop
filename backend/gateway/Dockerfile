FROM adoptopenjdk/openjdk11:alpine-jre
ARG JAR_FILE=target/gateway-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} gateway.jar
ENTRYPOINT ["java","-jar","gateway.jar"]
