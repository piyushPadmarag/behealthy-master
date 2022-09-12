FROM openjdk:11-jre-slim
WORKDIR usr/src
EXPOSE 9000
ADD ./target/user-service-0.0.1-SNAPSHOT.jar /usr/src/user-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar", "user-service-0.0.1-SNAPSHOT.jar"]