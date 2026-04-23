package com.example.ResumeScanner.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyzeRequest {
    
    @NotNull(message = "Resume ID is required")
    private Long resumeId;
    
    @NotBlank(message = "Job description is required")
    private String jobDescription;
}
