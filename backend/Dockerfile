# # define base docker image
# FROM openjdk:17
# LABEL maintainer="shrusti <shrusti.bali@atdxt.com>"
# ADD target/backend-0.0.1-SNAPSHOT.jar backend.jar
# ENTRYPOINT ["java","-jar","backend.jar"]
#
# Define base Docker image
FROM openjdk:17
LABEL maintainer="shrusti <shrusti.bali@atdxt.com>"

# Set the working directory
WORKDIR /app

# Copy the JAR file into the container
COPY target/backend-0.0.1-SNAPSHOT.jar /app/backend.jar

# Debugging: List the contents of the working directory
RUN ls -al

# Entrypoint command
ENTRYPOINT ["java","-jar","backend.jar"]
