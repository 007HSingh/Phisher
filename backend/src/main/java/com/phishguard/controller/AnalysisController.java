package com.phishguard.controller;

import com.phishguard.model.AnalysisRequest;
import com.phishguard.model.AnalysisResponse;
import com.phishguard.service.AnalysisService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class AnalysisController {

    private final AnalysisService analysisService;

    @Autowired
    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> status = new HashMap<>();
        status.put("status", "ok");
        status.put("version", "1.0");
        status.put("timestamp", System.currentTimeMillis());
        return ResponseEntity.ok(status);
    }

    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyze(@Valid @RequestBody AnalysisRequest request) {
        return ResponseEntity.ok(analysisService.analyze(request));
    }

    @PostMapping("/batch-analyze")
    public ResponseEntity<Map<String, Object>> batchAnalyze(@RequestBody Map<String, List<String>> request) {
        List<String> urls = request.get("urls");
        return ResponseEntity.ok(analysisService.batchAnalyze(urls));
    }

    @PostMapping("/check-threat")
    public ResponseEntity<Map<String, Object>> checkThreat(@RequestBody Map<String, String> request) {
        String url = request.get("url");
        return ResponseEntity.ok(analysisService.checkThreat(url));
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        return ResponseEntity.ok(analysisService.getStatistics());
    }

    @PostMapping("/analytics")
    public ResponseEntity<Map<String, Object>> sendAnalytics(@RequestBody Map<String, Object> analyticsData) {
        analysisService.processAnalytics(analyticsData);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("event_id", "EVT-" + System.currentTimeMillis());
        return ResponseEntity.accepted().body(response);
    }

    @PostMapping("/report")
    public ResponseEntity<Map<String, Object>> report(@RequestBody Map<String, Object> reportData) {
        analysisService.processReport(reportData);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Thank you for the report");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update-db")
    public ResponseEntity<Map<String, Object>> updateDb() {
        return ResponseEntity.ok(analysisService.updateDatabase());
    }
}
