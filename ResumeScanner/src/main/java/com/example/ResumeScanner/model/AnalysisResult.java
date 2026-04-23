package com.example.ResumeScanner.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "analysis_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisResult {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private double score;
    
    @Column(columnDefinition = "TEXT")
    private String matchedSkills;
    
    @Column(columnDefinition = "TEXT")
    private String missingSkills;
    
    @Column(columnDefinition = "TEXT")
    private String explanation;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;
    
    @Column(name = "analysis_date")
    private java.time.LocalDateTime analysisDate;
    
    @Column(name = "job_description")
    private String jobDescription;
    
    @PrePersist
    protected void onCreate() {
        analysisDate = java.time.LocalDateTime.now();
    }
}
