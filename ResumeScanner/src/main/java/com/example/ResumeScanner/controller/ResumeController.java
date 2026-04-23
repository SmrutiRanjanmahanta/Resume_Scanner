package com.example.ResumeScanner.controller;

import com.example.ResumeScanner.dto.AnalyzeRequest;
import com.example.ResumeScanner.dto.AnalysisResponse;
import com.example.ResumeScanner.dto.ResumeUploadResponse;
import com.example.ResumeScanner.model.Resume;
import com.example.ResumeScanner.service.AnalysisService;
import com.example.ResumeScanner.service.ResumeService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@RestController
@RequestMapping("/api/resume")
@CrossOrigin(origins = "*")
@Slf4j
public class ResumeController {
    
    @Autowired
    private ResumeService resumeService;
    
    @Autowired
    private AnalysisService analysisService;
    
    @PostMapping("/upload")
    public ResponseEntity<ResumeUploadResponse> uploadResume(@RequestParam("file") MultipartFile file) {
        try {
            log.info("Received upload request for file: {}", file.getOriginalFilename());
            
            Resume savedResume = resumeService.saveResume(file);
            
            ResumeUploadResponse response = new ResumeUploadResponse();
            response.setResumeId(savedResume.getId());
            response.setFileName(savedResume.getFileName());
            response.setMessage("Resume uploaded successfully");
            response.setSuccess(true);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            log.error("Error uploading resume: {}", e.getMessage());
            
            ResumeUploadResponse response = new ResumeUploadResponse();
            response.setMessage("Upload failed: " + e.getMessage());
            response.setSuccess(false);
            
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    
    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyzeResume(@Valid @RequestBody AnalyzeRequest request) {
        try {
            log.info("Received analysis request for resume ID: {}", request.getResumeId());
            
            if (!resumeService.resumeExists(request.getResumeId())) {
                AnalysisResponse response = new AnalysisResponse();
                response.setSuccess(false);
                response.setMessage("Resume not found with ID: " + request.getResumeId());
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            AnalysisResponse response = analysisService.analyzeResume(request.getResumeId(), request.getJobDescription());
            
            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            
        } catch (Exception e) {
            log.error("Error analyzing resume: {}", e.getMessage());
            
            AnalysisResponse response = new AnalysisResponse();
            response.setSuccess(false);
            response.setMessage("Analysis failed: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/result/{id}")
    public ResponseEntity<AnalysisResponse> getAnalysisResult(@PathVariable Long id) {
        try {
            log.info("Retrieving analysis result for ID: {}", id);
            
            Optional<AnalysisResponse> responseOpt = analysisService.getAnalysisResult(id);
            
            if (responseOpt.isPresent()) {
                return ResponseEntity.ok(responseOpt.get());
            } else {
                AnalysisResponse response = new AnalysisResponse();
                response.setSuccess(false);
                response.setMessage("Analysis result not found with ID: " + id);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
        } catch (Exception e) {
            log.error("Error retrieving analysis result: {}", e.getMessage());
            
            AnalysisResponse response = new AnalysisResponse();
            response.setSuccess(false);
            response.setMessage("Failed to retrieve result: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/{resumeId}/latest-result")
    public ResponseEntity<AnalysisResponse> getLatestAnalysisResult(@PathVariable Long resumeId) {
        try {
            log.info("Retrieving latest analysis result for resume ID: {}", resumeId);
            
            if (!resumeService.resumeExists(resumeId)) {
                AnalysisResponse response = new AnalysisResponse();
                response.setSuccess(false);
                response.setMessage("Resume not found with ID: " + resumeId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
            Optional<AnalysisResponse> responseOpt = analysisService.getLatestAnalysisByResumeId(resumeId);
            
            if (responseOpt.isPresent()) {
                return ResponseEntity.ok(responseOpt.get());
            } else {
                AnalysisResponse response = new AnalysisResponse();
                response.setSuccess(false);
                response.setMessage("No analysis results found for resume ID: " + resumeId);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
            
        } catch (Exception e) {
            log.error("Error retrieving latest analysis result: {}", e.getMessage());
            
            AnalysisResponse response = new AnalysisResponse();
            response.setSuccess(false);
            response.setMessage("Failed to retrieve result: " + e.getMessage());
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getResume(@PathVariable Long id) {
        try {
            Optional<Resume> resumeOpt = resumeService.getResumeById(id);
            
            if (resumeOpt.isPresent()) {
                return ResponseEntity.ok(resumeOpt.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Resume not found with ID: " + id);
            }
            
        } catch (Exception e) {
            log.error("Error retrieving resume: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to retrieve resume: " + e.getMessage());
        }
    }
}
