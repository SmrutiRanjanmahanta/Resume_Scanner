package com.example.ResumeScanner.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GroqAnalysisResult {
    private String id;
    private double score;
    
    @JsonProperty("matchedSkills")
    private List<String> matchedSkills;
    
    @JsonProperty("missingSkills")
    private List<String> missingSkills;
    
    private String explanation;
}
