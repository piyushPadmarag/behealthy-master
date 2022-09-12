FROM openjdk:11
WORKDIR usr/src
EXPOSE 8060
ADD ./target/appointment-service-0.0.1-SNAPSHOT.jar /usr/src/appointment-service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar", "appointment-service-0.0.1-SNAPSHOT.jar"]