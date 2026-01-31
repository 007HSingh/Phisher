'use client';

import { motion } from 'framer-motion';

export default function ComparisonTable() {
  const comparison = [
    { feature: 'Real-time Phishing Detection', wiseshield: true, antivirus: false, chrome: false },
    { feature: 'AI/ML Technology', wiseshield: true, antivirus: true, chrome: false },
    { feature: 'Zero-Day Protection', wiseshield: true, antivirus: false, chrome: false },
    { feature: 'Privacy-Focused', wiseshield: true, antivirus: false, chrome: false },
    { feature: 'Lightweight & Fast', wiseshield: true, antivirus: false, chrome: true },
    { feature: 'Free to Use', wiseshield: true, antivirus: false, chrome: true },
    { feature: 'Response Time', wiseshield: true, antivirus: false, chrome: false },
    { feature: 'Detection Accuracy', wiseshield: true, antivirus: true, chrome: false },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-gradient">WiseShield AI?</span>
          </h2>
        </motion.div>

        {/* Responsive Table */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-white border-b-2 border-gray-300">
                <th className="text-left py-4 px-6 font-bold text-gray-900">Feature</th>
                <th className="py-4 px-6 text-center">
                  <div className="flex justify-center">
                    <div className="text-center">
                      <div className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">
                        WiseShield AI
                      </div>
                    </div>
                  </div>
                </th>
                <th className="py-4 px-6 text-center">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-600">Traditional Antivirus</div>
                  </div>
                </th>
                <th className="py-4 px-6 text-center">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-600">Browser Built-in</div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-blue-50 transition">
                  <td className="py-4 px-6 font-medium text-gray-900">{row.feature}</td>
                  <td className="py-4 px-6 text-center">
                    {row.wiseshield ? (
                      <span className="text-green-600 font-bold">✓</span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {row.antivirus ? (
                      <span className="text-green-600 font-bold">✓</span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {row.chrome ? (
                      <span className="text-green-600 font-bold">✓</span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="btn btn-primary text-lg">
            Get Superior Protection Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
