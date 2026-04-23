package com.example.ResumeScanner.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisResponse {
    private Long analysisId;
    private Long resumeId;
    private double score;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private String explanation;
    private String jobDescription;
    private java.time.LocalDateTime analysisDate;
    private boolean success;
    private String message;
}
