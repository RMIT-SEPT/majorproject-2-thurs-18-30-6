FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD
MAINTAINER thurs-18.30-6
COPY pom.xml /build/
COPY src /build/src/
WORKDIR /build/
RUN mvn package
FROM openjdk:8-jre-alpine
WORKDIR /app
COPY --from=MAVEN_BUILD /build/target/majorproject-2-thurs-18-30-6-1.0.0.jar /app/
ENTRYPOINT ["java", "-jar", "majorproject-2-thurs-18-30-6-1.0.0.jar"]
