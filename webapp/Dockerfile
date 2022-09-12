FROM openjdk:11-jre-slim
WORKDIR usr/src
EXPOSE 4200
ADD ./target/webapp-0.0.1-SNAPSHOT.jar /usr/src/webapp-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar", "webapp-0.0.1-SNAPSHOT.jar"]