package com.phishguard.analyzer;

import org.springframework.stereotype.Component;

@Component
public class RiskAggregator {

    private static final double HEURISTIC_WEIGHT = 0.4;
    private static final double AI_WEIGHT = 0.6;

    public int aggregate(int heuristicScore, int aiScore) {
        double finalScore = (heuristicScore * HEURISTIC_WEIGHT) + (aiScore * AI_WEIGHT);
        return (int) Math.round(finalScore);
    }
}
