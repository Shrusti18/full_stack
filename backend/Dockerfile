# define base docker image
FROM openjdk:17
LABEL maintainer="shrusti <shrusti.bali@atdxt.com>"
ADD target/demo-0.0.1-SNAPSHOT.jar demo.jar
ENTRYPOINT ["java","-jar","demo.jar"]

