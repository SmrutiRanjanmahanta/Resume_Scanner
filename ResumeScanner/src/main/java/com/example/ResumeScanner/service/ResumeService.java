package com.example.ResumeScanner.service;

import com.example.ResumeScanner.model.Resume;
import com.example.ResumeScanner.repository.ResumeRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@Slf4j
public class ResumeService {
    
    @Autowired
    private ResumeRepository resumeRepository;
    
    @Autowired
    private ParsingService parsingService;
    
    @Transactional
    public Resume saveResume(MultipartFile file) throws Exception {
        try {
            log.info("Processing resume upload for file: {}", file.getOriginalFilename());
            
            String extractedText = parsingService.extractText(file);
            String fileType = parsingService.getFileType(file);
            
            Resume resume = new Resume();
            resume.setRawText(extractedText);
            resume.setFileName(file.getOriginalFilename());
            resume.setFileType(fileType);
            
            Resume savedResume = resumeRepository.save(resume);
            log.info("Successfully saved resume with ID: {}", savedResume.getId());
            
            return savedResume;
            
        } catch (Exception e) {
            log.error("Error saving resume: {}", e.getMessage());
            throw new RuntimeException("Failed to save resume: " + e.getMessage(), e);
        }
    }
    
    public Optional<Resume> getResumeById(Long resumeId) {
        return resumeRepository.findById(resumeId);
    }
    
    public boolean resumeExists(Long resumeId) {
        return resumeRepository.existsById(resumeId);
    }
    
    @Transactional
    public void deleteResume(Long resumeId) throws Exception {
        if (!resumeRepository.existsById(resumeId)) {
            throw new IllegalArgumentException("Resume not found with ID: " + resumeId);
        }
        
        resumeRepository.deleteById(resumeId);
        log.info("Deleted resume with ID: {}", resumeId);
    }
    
    public String getResumeText(Long resumeId) throws Exception {
        Optional<Resume> resumeOpt = resumeRepository.findById(resumeId);
        if (resumeOpt.isEmpty()) {
            throw new IllegalArgumentException("Resume not found with ID: " + resumeId);
        }
        
        return resumeOpt.get().getRawText();
    }
}
