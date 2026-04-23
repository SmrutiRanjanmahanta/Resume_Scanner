# ResumeScanner - Build & Deployment Guide

## 🚀 Project Overview
ResumeScanner is a Spring Boot application that provides AI-powered resume analysis using Groq API. It analyzes resumes against job descriptions and provides detailed scoring and skill matching.

## 📋 Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- MySQL 8.0 or higher
- Spring Boot 3.x
- Valid Groq API key

## 🛠️ Build Instructions

### 1. **Clone the Project**
```bash
git clone <your-repository-url>
cd ResumeScanner
```

### 2. **Database Setup**
```sql
-- Create MySQL database
CREATE DATABASE resume_db;

-- Create user (optional)
CREATE USER 'resume_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON resume_db.* TO 'resume_user'@'localhost';
FLUSH PRIVILEGES;
```

### 3. **Configure Application Properties**
Update `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/resume_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Groq API Configuration
groq.api.api-key=your_groq_api_key
groq.api.base-url=https://api.groq.com/openai/v1
groq.api.model=llama-3.1-8b-instant
groq.api.temperature=0.1
groq.api.max-tokens=4096
```

### 4. **Build the Application**
```bash
# Clean and compile
mvn clean compile

# Run tests
mvn test

# Package the application
mvn clean package

# Skip tests during build
mvn clean package -DskipTests
```

### 5. **Run the Application**

#### Option A: Using Maven
```bash
mvn spring-boot:run
```

#### Option B: Using JAR file
```bash
java -jar target/ResumeScanner-*.jar
```

#### Option C: Using specific profile
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## 🐳 Docker Build

### 1. **Create Dockerfile**
```dockerfile
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY target/ResumeScanner-*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
```

### 2. **Build Docker Image**
```bash
# Build the application first
mvn clean package

# Build Docker image
docker build -t resume-scanner:latest .

# Run container
docker run -p 8080:8080 -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/resume_db resume-scanner:latest
```

### 3. **Docker Compose**
Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: resume_db
      MYSQL_USER: resume_user
      MYSQL_PASSWORD: userpassword
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  resume-scanner:
    build: .
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://mysql:3306/resume_db
      SPRING_DATASOURCE_USERNAME: resume_user
      SPRING_DATASOURCE_PASSWORD: userpassword
      GROQ_API_API_KEY: your_groq_api_key
    depends_on:
      - mysql

volumes:
  mysql_data:
```

Run with:
```bash
docker-compose up -d
```

## 🌐 Production Deployment

### 1. **JAR Deployment**
```bash
# Build for production
mvn clean package -Pprod

# Run with production profile
java -jar -Dspring.profiles.active=prod target/ResumeScanner-*.jar
```

### 2. **War Deployment (for Tomcat)**
Update `pom.xml`:
```xml
<packaging>war</packaging>
```

Build and deploy to Tomcat:
```bash
mvn clean package
# Copy target/ResumeScanner-*.war to Tomcat webapps directory
```

### 3. **Cloud Deployment**

#### AWS EC2
```bash
# Launch EC2 instance with Java 17
# Install MySQL, configure security groups
# Deploy JAR file and run as service
```

#### Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
heroku config:set GROQ_API_API_KEY=your_key
git push heroku main
```

#### AWS Elastic Beanstalk
```bash
# Install EB CLI
eb init resume-scanner
eb create production
eb deploy
```

## 📊 Monitoring & Logging

### 1. **Application Monitoring**
```properties
# Actuator endpoints
management.endpoints.web.exposure.include=health,info,metrics
management.endpoint.health.show-details=always
```

### 2. **Logging Configuration**
```properties
# Log levels
logging.level.com.example.ResumeScanner=INFO
logging.level.org.springframework.web=WARN
logging.file.name=logs/resume-scanner.log
```

## 🔧 API Testing

### 1. **Postman Collection**
- Import `Postman_Collection.json`
- Import `Postman_Environment.json`
- Set environment variables
- Test all endpoints

### 2. **CURL Commands**
```bash
# Upload resume
curl -X POST -F "file=@resume.pdf" http://localhost:8080/api/resume/upload

# Analyze resume
curl -X POST -H "Content-Type: application/json" \
  -d '{"resumeId":1,"jobDescription":"Java Developer with Spring Boot"}' \
  http://localhost:8080/api/resume/analyze

# Get results
curl http://localhost:8080/api/resume/result/1
```

## 🚨 Troubleshooting

### Common Issues:
1. **Database Connection**: Ensure MySQL is running and credentials are correct
2. **API Key**: Verify Groq API key is valid and has sufficient credits
3. **Port Conflicts**: Change server.port if 8080 is in use
4. **Memory Issues**: Increase JVM heap size with `-Xmx2g`

### Health Checks:
```bash
# Application health
curl http://localhost:8080/actuator/health

# Database connectivity
curl http://localhost:8080/actuator/health/db
```

## 📈 Performance Optimization

### 1. **JVM Tuning**
```bash
java -Xmx2g -Xms1g -XX:+UseG1GC -jar target/ResumeScanner-*.jar
```

### 2. **Database Optimization**
```sql
-- Add indexes for better performance
CREATE INDEX idx_resume_upload_date ON resumes(upload_date);
CREATE INDEX idx_analysis_resume_id ON analysis_results(resume_id);
```

### 3. **Caching**
```properties
# Enable caching
spring.cache.type=redis
spring.redis.host=localhost
spring.redis.port=6379
```

## 🔐 Security Considerations

### 1. **Environment Variables**
```bash
export GROQ_API_API_KEY=your_secret_key
export DB_PASSWORD=your_db_password
```

### 2. **HTTPS Configuration**
```properties
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=your_password
server.ssl.key-store-type=PKCS12
```

## 📝 Build URLs & Resources

### **Maven Repository URLs:**
- Central Repository: https://repo1.maven.org/maven2/
- Spring Repository: https://repo.spring.io/libs-release/

### **Dependency URLs:**
- Spring Boot: https://spring.io/projects/spring-boot
- MySQL Connector: https://mvnrepository.com/artifact/mysql/mysql-connector-java
- Jackson: https://github.com/FasterXML/jackson
- Lombok: https://projectlombok.org/

### **Documentation URLs:**
- Spring Boot Docs: https://docs.spring.io/spring-boot/docs/current/reference/html/
- Groq API Docs: https://console.groq.com/docs
- MySQL Docs: https://dev.mysql.com/doc/

### **Monitoring URLs:**
- Spring Boot Actuator: http://localhost:8080/actuator
- Application Info: http://localhost:8080/actuator/info
- Health Check: http://localhost:8080/actuator/health

### **API Endpoints:**
- Base URL: http://localhost:8080
- Upload Resume: POST /api/resume/upload
- Analyze Resume: POST /api/resume/analyze
- Get Results: GET /api/resume/result/{id}
- Get Latest: GET /api/resume/{resumeId}/latest-result

## 🎯 Quick Start Commands

```bash
# Complete setup in one go
git clone <repo-url>
cd ResumeScanner
mvn clean package -DskipTests
java -jar target/ResumeScanner-*.jar

# Test with curl
curl -X POST -F "file=@test-resume.pdf" http://localhost:8080/api/resume/upload
```

Your ResumeScanner application is now ready for production deployment! 🚀
