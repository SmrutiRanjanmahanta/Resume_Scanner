package com.example.ResumeScanner.service;

import org.apache.tika.Tika;
import org.apache.tika.metadata.Metadata;
import org.apache.tika.parser.AutoDetectParser;
import org.apache.tika.parser.ParseContext;
import org.apache.tika.parser.Parser;
import org.apache.tika.sax.BodyContentHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

@Service
public class ParsingService {
    
    private static final List<String> SUPPORTED_CONTENT_TYPES = Arrays.asList(
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
        "text/plain"
    );
    
    private final Tika tika = new Tika();
    
    public String extractText(MultipartFile file) throws Exception {
        validateFile(file);
        
        try (InputStream inputStream = file.getInputStream()) {
            BodyContentHandler handler = new BodyContentHandler(-1);
            Metadata metadata = new Metadata();
            ParseContext parseContext = new ParseContext();
            Parser parser = new AutoDetectParser();
            
            parser.parse(inputStream, handler, metadata, parseContext);
            
            String extractedText = handler.toString();
            return cleanText(extractedText);
        }
    }
    
    private void validateFile(MultipartFile file) throws Exception {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        
        String contentType = file.getContentType();
        if (contentType == null || !SUPPORTED_CONTENT_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Unsupported file type: " + contentType + 
                ". Supported types: PDF, DOCX, DOC, TXT");
        }
        
        long fileSize = file.getSize();
        if (fileSize > 10 * 1024 * 1024) {
            throw new IllegalArgumentException("File size exceeds 10MB limit");
        }
    }
    
    private String cleanText(String text) {
        if (text == null) {
            return "";
        }
        
        return text
            .replaceAll("\\s+", " ")
            .replaceAll("[^\\w\\s\\-.,;:!@#$%^&*()_+=\\[\\]{}|\\\\'\"<>?/~`]", "")
            .trim();
    }
    
    public String getFileType(MultipartFile file) {
        return file.getContentType();
    }
}
