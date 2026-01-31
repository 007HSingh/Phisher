package com.phishguard.model;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisRequest {
    @NotBlank(message = "URL is required")
    private String url;
    
    private String pageText;
    
    private boolean hasPasswordField;
}
