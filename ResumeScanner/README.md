# AI-Powered Resume Screening Application

A complete backend system for analyzing resumes against job descriptions using AI technology.

## Tech Stack

- **Java 21**
- **Spring Boot 4.0.5**
- **Spring Web**
- **Spring Data JPA**
- **MySQL**
- **Apache Tika** (for resume parsing)
- **Groq API** (for AI analysis)
- **Maven**

## Features

- Upload and parse resumes (PDF/DOCX/TXT)
- Store resume text in database
- Analyze resumes against job descriptions using AI
- Get structured analysis results with scores and skill matching
- RESTful API endpoints

## API Endpoints

### Resume Management
- `POST /api/resume/upload` - Upload a resume file
- `GET /api/resume/{id}` - Get resume by ID

### Analysis
- `POST /api/resume/analyze` - Analyze resume against job description
- `GET /api/resume/result/{id}` - Get analysis result by ID
- `GET /api/resume/{resumeId}/latest-result` - Get latest analysis for a resume

## Setup Instructions

### 1. Database Setup
```sql
CREATE DATABASE resume_db;
```

### 2. Configuration
Update `application.properties`:
- Set your MySQL credentials
- Add your Groq API key

### 3. Build and Run
```bash
mvn clean install
mvn spring-boot:run
```

## Request/Response Examples

### Upload Resume
```bash
curl -X POST -F "file=@resume.pdf" http://localhost:8080/api/resume/upload
```

Response:
```json
{
  "resumeId": 1,
  "fileName": "resume.pdf",
  "message": "Resume uploaded successfully",
  "success": true
}
```

### Analyze Resume
```bash
curl -X POST -H "Content-Type: application/json" \
-d '{
  "resumeId": 1,
  "jobDescription": "Senior Java Developer with Spring Boot experience"
}' \
http://localhost:8080/api/resume/analyze
```

Response:
```json
{
  "analysisId": 1,
  "resumeId": 1,
  "score": 85.5,
  "matchedSkills": ["Java", "Spring Boot", "REST API"],
  "missingSkills": ["Kubernetes", "AWS"],
  "explanation": "Strong match with good technical skills...",
  "jobDescription": "Senior Java Developer...",
  "analysisDate": "2024-01-15T10:30:00",
  "success": true,
  "message": "Analysis completed successfully"
}
```

## Project Structure

```
src/main/java/com/example/ResumeScanner/
├── controller/          # REST controllers
├── service/            # Business logic
├── repository/         # Data access layer
├── model/              # JPA entities
├── dto/                # Data transfer objects
├── config/             # Configuration classes
└── exception/          # Exception handling
```

## Dependencies

Key dependencies include:
- Spring Boot Starter Web
- Spring Boot Starter Data JPA
- MySQL Connector
- Apache Tika
- Spring Boot Starter WebFlux (for WebClient)
- Lombok
- Spring Boot Starter Validation

## Environment Variables

Required environment variables:
- `GROQ_API_KEY` - Your Groq API key for resume analysis

## Error Handling

The application includes comprehensive error handling with proper HTTP status codes and error messages for:
- File upload errors
- Validation failures
- API call failures
- Database errors

## Logging

Debug logging is enabled for the application package and Spring Web components.
