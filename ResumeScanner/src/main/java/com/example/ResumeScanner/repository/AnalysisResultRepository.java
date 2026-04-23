package com.example.ResumeScanner.repository;

import com.example.ResumeScanner.model.AnalysisResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnalysisResultRepository extends JpaRepository<AnalysisResult, Long> {
    
    Optional<AnalysisResult> findByResumeId(Long resumeId);
    
    List<AnalysisResult> findByResumeIdOrderByAnalysisDateDesc(Long resumeId);
    
    @Query("SELECT ar FROM AnalysisResult ar WHERE ar.resume.id = :resumeId ORDER BY ar.analysisDate DESC")
    Optional<AnalysisResult> findLatestByResumeId(@Param("resumeId") Long resumeId);
    
    boolean existsByResumeId(Long resumeId);
}
