'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LiveDemo() {
  const [demoUrl, setDemoUrl] = useState('');
  const [result, setResult] = useState<null | { status: string; risk: string; color: string }>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const exampleUrls = [
    { url: 'https://google.com', status: 'Safe', risk: 'No threats detected' },
    { url: 'https://paypa1-verify.com', status: 'Dangerous', risk: 'Phishing attempt detected' },
    { url: 'https://unusual-bank-login.co', status: 'Suspicious', risk: 'Potential phishing' },
  ];

  const handleAnalyze = async () => {
    if (!demoUrl.trim()) return;

    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      const isPhishing = demoUrl.includes('paypa1') || demoUrl.includes('verify') || demoUrl.length > 50;
      const isSuspicious = demoUrl.includes('unusual') || demoUrl.includes('click') || demoUrl.includes('verify-now');

      let result = {
        status: 'Safe',
        risk: 'No threats detected',
        color: 'green',
      };

      if (isPhishing) {
        result = {
          status: 'Dangerous',
          risk: 'Phishing attempt detected',
          color: 'red',
        };
      } else if (isSuspicious) {
        result = {
          status: 'Suspicious',
          risk: 'Potential phishing or malicious content',
          color: 'yellow',
        };
      }

      setResult(result);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleExampleClick = (url: string) => {
    setDemoUrl(url);
  };

  return (
    <section className="section bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See It In <span className="text-gradient">Action</span>
          </h2>
          <p className="text-xl text-gray-600">
            Test our AI-powered threat detection in real-time
          </p>
        </motion.div>

        {/* Demo Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="card mb-8"
        >
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Paste a URL to test (e.g., https://example.com)"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <button
              onClick={handleAnalyze}
              disabled={!demoUrl.trim() || isAnalyzing}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>

          {/* Result Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 rounded-lg border-l-4 ${
                result.color === 'green'
                  ? 'bg-green-50 border-green-500'
                  : result.color === 'red'
                  ? 'bg-red-50 border-red-500'
                  : 'bg-yellow-50 border-yellow-500'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div
                  className={`w-4 h-4 rounded-full ${
                    result.color === 'green'
                      ? 'bg-green-500'
                      : result.color === 'red'
                      ? 'bg-red-500'
                      : 'bg-yellow-500'
                  }`}
                />
                <span className="font-bold text-gray-900">Status: {result.status}</span>
              </div>
              <p className="text-gray-600">{result.risk}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Example URLs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 text-sm mb-4">Try these examples:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {exampleUrls.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => handleExampleClick(example.url)}
                whileHover={{ scale: 1.02 }}
                className="p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-600 hover:shadow-md transition text-left"
              >
                <p className="text-sm text-gray-600 mb-2 font-mono">{example.url}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">{example.status}</span>
                  <span className="text-xs text-gray-500">{example.risk}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
