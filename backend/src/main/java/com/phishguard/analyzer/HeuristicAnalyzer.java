package com.phishguard.analyzer;

import com.phishguard.model.AnalysisRequest;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HeuristicAnalyzer {

    public HeuristicResult analyze(AnalysisRequest request) {
        List<String> reasons = new ArrayList<>();
        int score = 0;

        // URL length check
        if (request.getUrl().length() > 75) {
            score += 20;
            reasons.add("URL length is unusually long");
        }

        // Subdomain depth
        long dots = request.getUrl().chars().filter(ch -> ch == '.').count();
        if (dots > 3) {
            score += 20;
            reasons.add("High number of subdomains detected");
        }

        // Keyword detection
        String text = request.getPageText() != null ? request.getPageText().toLowerCase() : "";
        if (text.contains("urgent") || text.contains("verify") || text.contains("suspended") || text.contains("immediately")) {
            score += 30;
            reasons.add("Urgent or suspicious language detected in page text");
        }

        // Credential field detection
        if (request.isHasPasswordField()) {
            score += 30;
            reasons.add("Credential input field present on a suspicious page");
        }

        return new HeuristicResult(Math.min(score, 100), reasons);
    }

    public record HeuristicResult(int score, List<String> reasons) {}
}
