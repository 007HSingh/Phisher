package com.phishguard.analyzer;

import com.phishguard.model.AnalysisRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class AiAnalyzer {

    private final RestTemplate restTemplate;
    
    @Value("${ai-service.url:http://localhost:5001}")
    private String aiServiceUrl;

    @Autowired
    public AiAnalyzer(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public AiResult analyze(AnalysisRequest request) {
        List<String> reasons = new ArrayList<>();
        
        try {
            log.info("Calling AI service at: {}/classify", aiServiceUrl);
            Map<String, Object> aiRequest = Collections.singletonMap("url", request.getUrl());
            @SuppressWarnings("unchecked")
            Map<String, Object> aiResponse = restTemplate.postForObject(aiServiceUrl + "/classify", aiRequest, Map.class);

            if (aiResponse != null && aiResponse.containsKey("phishing")) {
                boolean isPhishing = (Boolean) aiResponse.get("phishing");
                double probability = (Double) aiResponse.get("probability");
                
                int score = (int) (probability * 100);
                if (isPhishing) {
                    reasons.add("AI detected high intent of credential harvesting (prob: " + String.format("%.2f", probability) + ")");
                } else {
                    reasons.add("AI analysis indicates a low-risk informational page");
                }
                
                return new AiResult(score, reasons, probability);
            }
        } catch (Exception e) {
            log.error("AI service call failed: {}. Falling back to heuristic defaults.", e.getMessage());
        }

        // Fallback or default
        reasons.add("AI service unavailable, using safety defaults");
        return new AiResult(10, reasons, 0.5);
    }

    public record AiResult(int score, List<String> reasons, double confidence) {}
}
