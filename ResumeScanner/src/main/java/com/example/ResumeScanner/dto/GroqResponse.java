package com.example.ResumeScanner.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class GroqResponse {
    private GroqChoice[] choices;
    private GroqUsage usage;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class GroqChoice {
        private GroqMessage message;
        private String finish_reason;
        private int index;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class GroqMessage {
        private String role;
        private String content;
    }
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class GroqUsage {
        private int prompt_tokens;
        private int completion_tokens;
        private int total_tokens;
    }
}
