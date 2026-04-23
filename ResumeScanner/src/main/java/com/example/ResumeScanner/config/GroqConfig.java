package com.example.ResumeScanner.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Data;

@Configuration
@ConfigurationProperties(prefix = "groq.api")
@Data
public class GroqConfig {
    
    private String apiKey;
    private String baseUrl = "https://api.groq.com/openai/v1";
    private String model = "llama3-8b-8192";
    private double temperature = 0.1;
    private int maxTokens = 4096;
}
