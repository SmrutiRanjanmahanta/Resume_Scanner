package com.example.ResumeScanner.service;

import com.example.ResumeScanner.dto.AnalysisResponse;
import com.example.ResumeScanner.dto.GroqAnalysisResult;
import com.example.ResumeScanner.model.AnalysisResult;
import com.example.ResumeScanner.model.Resume;
import com.example.ResumeScanner.repository.AnalysisResultRepository;
import com.example.ResumeScanner.repository.ResumeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Optional;

@Service
@Slf4j
public class AnalysisService {
    
    @Autowired
    private GroqService groqService;
    
    @Autowired
    private ResumeRepository resumeRepository;
    
    @Autowired
    private AnalysisResultRepository analysisResultRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Transactional
    public AnalysisResponse analyzeResume(Long resumeId, String jobDescription) throws Exception {
        try {
            log.info("Starting analysis for resume ID: {}", resumeId);
            
            Optional<Resume> resumeOpt = resumeRepository.findById(resumeId);
            if (resumeOpt.isEmpty()) {
                return createErrorResponse("Resume not found with ID: " + resumeId);
            }
            
            Resume resume = resumeOpt.get();
            
            String groqResponse = groqService.analyzeResume(resume.getRawText(), jobDescription);
            log.debug("Groq response: {}", groqResponse);
            
            GroqAnalysisResult analysisResult = parseGroqResponse(groqResponse);
            log.debug("Parsed analysis result: {}", analysisResult);
            
            AnalysisResult savedResult = saveAnalysisResult(resume, analysisResult, jobDescription);
            
            return createSuccessResponse(savedResult);
            
        } catch (Exception e) {
            log.error("Error during resume analysis: {}", e.getMessage());
            return createErrorResponse("Analysis failed: " + e.getMessage());
        }
    }
    
    private GroqAnalysisResult parseGroqResponse(String groqResponse) throws Exception {
        try {
            return objectMapper.readValue(groqResponse, GroqAnalysisResult.class);
        } catch (Exception e) {
            log.error("Error parsing Groq response: {}", e.getMessage());
            throw new RuntimeException("Failed to parse AI response: " + e.getMessage(), e);
        }
    }
    
    private AnalysisResult saveAnalysisResult(Resume resume, GroqAnalysisResult analysisResult, String jobDescription) {
        log.debug("Saving analysis result with score: {}", analysisResult.getScore());
        
        AnalysisResult result = new AnalysisResult();
        result.setResume(resume);
        result.setScore(analysisResult.getScore());
        
        // Handle null lists safely
        if (analysisResult.getMatchedSkills() != null) {
            result.setMatchedSkills(String.join(", ", analysisResult.getMatchedSkills()));
        } else {
            result.setMatchedSkills("");
        }
        
        if (analysisResult.getMissingSkills() != null) {
            result.setMissingSkills(String.join(", ", analysisResult.getMissingSkills()));
        } else {
            result.setMissingSkills("");
        }
        
        result.setExplanation(analysisResult.getExplanation() != null ? analysisResult.getExplanation() : "");
        result.setJobDescription(jobDescription);
        
        AnalysisResult savedResult = analysisResultRepository.save(result);
        log.info("Saved analysis result with ID: {}", savedResult.getId());
        
        return savedResult;
    }
    
    private AnalysisResponse createSuccessResponse(AnalysisResult result) {
        AnalysisResponse response = new AnalysisResponse();
        response.setAnalysisId(result.getId());
        response.setResumeId(result.getResume().getId());
        response.setScore(result.getScore());
        
        // Handle empty strings safely
        String matchedSkills = result.getMatchedSkills();
        if (matchedSkills != null && !matchedSkills.trim().isEmpty()) {
            response.setMatchedSkills(Arrays.asList(matchedSkills.split(",\\s*")));
        } else {
            response.setMatchedSkills(Arrays.asList());
        }
        
        String missingSkills = result.getMissingSkills();
        if (missingSkills != null && !missingSkills.trim().isEmpty()) {
            response.setMissingSkills(Arrays.asList(missingSkills.split(",\\s*")));
        } else {
            response.setMissingSkills(Arrays.asList());
        }
        
        response.setExplanation(result.getExplanation());
        response.setJobDescription(result.getJobDescription());
        response.setAnalysisDate(result.getAnalysisDate());
        response.setSuccess(true);
        response.setMessage("Analysis completed successfully");
        
        return response;
    }
    
    private AnalysisResponse createErrorResponse(String message) {
        AnalysisResponse response = new AnalysisResponse();
        response.setSuccess(false);
        response.setMessage(message);
        
        return response;
    }
    
    public Optional<AnalysisResponse> getAnalysisResult(Long analysisId) {
        Optional<AnalysisResult> resultOpt = analysisResultRepository.findById(analysisId);
        if (resultOpt.isEmpty()) {
            return Optional.empty();
        }
        
        AnalysisResponse response = createSuccessResponse(resultOpt.get());
        return Optional.of(response);
    }
    
    public Optional<AnalysisResponse> getLatestAnalysisByResumeId(Long resumeId) {
        Optional<AnalysisResult> resultOpt = analysisResultRepository.findLatestByResumeId(resumeId);
        if (resultOpt.isEmpty()) {
            return Optional.empty();
        }
        
        AnalysisResponse response = createSuccessResponse(resultOpt.get());
        return Optional.of(response);
    }
}
