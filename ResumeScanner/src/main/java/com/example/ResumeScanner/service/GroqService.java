package com.example.ResumeScanner.service;

import com.example.ResumeScanner.config.GroqConfig;
import com.example.ResumeScanner.dto.GroqResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class GroqService {
    
    @Autowired
    private GroqConfig groqConfig;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private RestTemplate restTemplate;
    
    public String analyzeResume(String resumeText, String jobDescription) throws Exception {
        try {
            String prompt = buildPrompt(resumeText, jobDescription);
            
            log.info("Sending request to Groq API for resume analysis");
            
            String response = callGroq(prompt);
            
            log.info("Received response from Groq API");
            
            return response;
            
        } catch (Exception e) {
            log.error("Error calling Groq API: {}", e.getMessage());
            throw new RuntimeException("Failed to call Groq API: " + e.getMessage(), e);
        }
    }
    
    public String callGroq(String prompt) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + groqConfig.getApiKey());
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Escape quotes and newlines
        String safePrompt = prompt.replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "\\r");

        String requestBody = String.format(
            "{\"model\":\"%s\",\"temperature\":%s,\"max_tokens\":%d,\"messages\":[{\"role\":\"user\",\"content\":\"%s\"}]}",
            groqConfig.getModel(), groqConfig.getTemperature(), groqConfig.getMaxTokens(), safePrompt);

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

        log.debug("Request URL: {}", groqConfig.getBaseUrl() + "/chat/completions");
        log.debug("Request Body: {}", requestBody);

        try {
            String response = restTemplate.postForObject(
                groqConfig.getBaseUrl() + "/chat/completions",
                entity,
                String.class
            );
            
            log.debug("Raw Groq API response: {}", response);
            
            // Parse the Groq API response to extract the actual AI content
            GroqResponse groqApiResponse = objectMapper.readValue(response, GroqResponse.class);
            
            if (groqApiResponse.getChoices() == null || groqApiResponse.getChoices().length == 0) {
                throw new RuntimeException("No choices in Groq API response");
            }
            
            String aiContent = groqApiResponse.getChoices()[0].getMessage().getContent();
            log.debug("Extracted AI content: {}", aiContent);
            
            // Extract JSON from the AI response
            String jsonContent = extractJsonFromResponse(aiContent);
            log.debug("Extracted JSON: {}", jsonContent);
            
            return jsonContent;
            
        } catch (HttpClientErrorException e) {
            log.error("GROQ ERROR: {}", e.getResponseBodyAsString());
            throw e;
        } catch (Exception e) {
            log.error("Error parsing Groq API response: {}", e.getMessage());
            throw new RuntimeException("Failed to parse Groq API response: " + e.getMessage(), e);
        }
    }
    
    private String extractJsonFromResponse(String aiResponse) {
        // Look for JSON content between ```json and ``` markers
        int jsonStart = aiResponse.indexOf("```json");
        if (jsonStart != -1) {
            jsonStart = aiResponse.indexOf("{", jsonStart);
            int jsonEnd = aiResponse.indexOf("```", jsonStart);
            if (jsonEnd != -1 && jsonStart != -1) {
                return aiResponse.substring(jsonStart, jsonEnd);
            }
        }
        
        // If no markdown markers, look for JSON object directly
        jsonStart = aiResponse.indexOf("{");
        int jsonEnd = aiResponse.lastIndexOf("}");
        if (jsonStart != -1 && jsonEnd != -1 && jsonEnd > jsonStart) {
            return aiResponse.substring(jsonStart, jsonEnd + 1);
        }
        
        // If no JSON found, return the original response
        return aiResponse;
    }
    
    private String buildPrompt(String resumeText, String jobDescription) {
        return String.format(
            "You are an AI resume analyzer.\n" +
            "Analyze the resume and job description below.\n\n" +
            "Resume:\n%s\n\n" +
            "Job Description:\n%s\n\n" +
            "Return ONLY valid JSON:\n" +
            "{\n" +
            "  \"score\": number,\n" +
            "  \"matchedSkills\": [],\n" +
            "  \"missingSkills\": [],\n" +
            "  \"explanation\": \"\"\n" +
            "}",
            resumeText,
            jobDescription
        );
    }
}
