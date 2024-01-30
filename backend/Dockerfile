# define base docker image
FROM openjdk:17
LABEL maintainer="shrusti <shrusti.bali@atdxt.com>"
ADD target/backend-0.0.1-SNAPSHOT.jar backend.jar
ENTRYPOINT ["java","-jar","backend.jar"]

