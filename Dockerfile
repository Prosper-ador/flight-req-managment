# Use a slim OpenJDK base image for smaller size
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built Spring Boot JAR file into the container
# Assuming your project builds a JAR named 'skywings-flight-api.jar' in the 'target' directory
# For Gradle projects, the JAR is typically in the 'build/libs' directory
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

# Expose the port your Spring Boot application listens on (default 8080)
EXPOSE 8080

# Define the command to run your Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]

# Optional: Add health check command for K8s readiness/liveness probes
HEALTHCHECK --interval=30s --timeout=10s --retries=5 CMD curl -f http://localhost:8080/actuator/health || exit 1