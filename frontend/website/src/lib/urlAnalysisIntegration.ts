/**
 * Example: Using URL Analysis in the Website
 * Send URL features to backend from a Next.js component
 */

import { analyzeURL } from '@/lib/urlAnalysis';

/**
 * Send URL analysis to backend
 * @param url - The URL to analyze and send
 * @returns Response from backend
 */
export async function sendURLAnalysisToBackend(url: string) {
  try {
    // Extract URL features
    const features = analyzeURL(url);

    // Prepare payload for backend
    const payload = {
      url: url,
      features: features,
      timestamp: new Date().toISOString()
    };

    console.log('Sending URL analysis to backend:', payload);

    // Send to backend
    const response = await fetch('/api/analyze-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Backend response:', result);

    return result;
  } catch (error) {
    console.error('Error sending URL analysis to backend:', error);
    throw error;
  }
}

/**
 * Example usage in a React component
 * 
 * import { sendURLAnalysisToBackend } from '@/lib/urlAnalysisIntegration';
 * 
 * async function handleURLCheck(url: string) {
 *   try {
 *     const result = await sendURLAnalysisToBackend(url);
 *     console.log('Phishing risk assessment:', result);
 *   } catch (error) {
 *     console.error('Failed to check URL:', error);
 *   }
 * }
 */

/**
 * Example backend API route: pages/api/analyze-url.ts
 * 
 * import type { NextApiRequest, NextApiResponse } from 'next';
 * 
 * export default async function handler(
 *   req: NextApiRequest,
 *   res: NextApiResponse
 * ) {
 *   if (req.method !== 'POST') {
 *     return res.status(405).json({ error: 'Method not allowed' });
 *   }
 * 
 *   try {
 *     const { url, features } = req.body;
 * 
 *     // Send features to your ML model or backend service
 *     const response = await fetch('https://your-backend.com/predict', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify(features)
 *     });
 * 
 *     const prediction = await response.json();
 * 
 *     res.status(200).json({
 *       url: url,
 *       risk_level: prediction.risk_level,
 *       confidence: prediction.confidence
 *     });
 *   } catch (error) {
 *     res.status(500).json({ error: 'Internal server error' });
 *   }
 * }
 */
