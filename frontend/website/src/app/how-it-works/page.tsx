import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How WiseShield AI Works - Technical Deep Dive',
  description: 'Learn the technology behind WiseShield AI phishing detection',
};

export default function HowItWorksPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How WiseShield AI Works</h1>
        <p className="text-xl text-gray-600 mb-12">
          Understanding our three-layer security architecture
        </p>

        <div className="space-y-12">
          {/* Layer 1 */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Layer 1: URL Analysis</h2>
            <p className="text-gray-600 mb-6">
              Every URL you visit is instantly analyzed across multiple dimensions:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li>✓ <strong>Domain Age:</strong> Newly registered domains are often phishing sites</li>
              <li>✓ <strong>SSL Certificates:</strong> Validates certificate validity and issuance</li>
              <li>✓ <strong>URL Patterns:</strong> Detects typosquatting and suspicious patterns</li>
              <li>✓ <strong>WHOIS Data:</strong> Analyzes domain registration information</li>
              <li>✓ <strong>DNS Records:</strong> Checks DNS consistency and reputation</li>
            </ul>
          </section>

          {/* Layer 2 */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Layer 2: Content Analysis</h2>
            <p className="text-gray-600 mb-6">
              We analyze the page content for suspicious elements:
            </p>
            <ul className="space-y-3 text-gray-600">
              <li>✓ <strong>Form Detection:</strong> Identifies credential harvesting forms</li>
              <li>✓ <strong>Link Analysis:</strong> Checks where links actually point to</li>
              <li>✓ <strong>Brand Impersonation:</strong> Detects fake brand logos and names</li>
              <li>✓ <strong>Content Similarity:</strong> Compares to legitimate sites</li>
            </ul>
          </section>

          {/* Layer 3 */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Layer 3: Machine Learning</h2>
            <p className="text-gray-600 mb-6">
              Our ML model combines all signals into an accurate prediction:
            </p>
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-3">Model Specifications:</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• <strong>Algorithm:</strong> Random Forest with 100+ decision trees</li>
                <li>• <strong>Training Data:</strong> 2 million+ URLs (50% phishing, 50% legitimate)</li>
                <li>• <strong>Features:</strong> 50+ engineered features</li>
                <li>• <strong>Accuracy:</strong> 99.2% on test set</li>
                <li>• <strong>False Positives:</strong> &lt;1%</li>
                <li>• <strong>Response Time:</strong> &lt;100ms per URL</li>
              </ul>
            </div>
          </section>

          {/* Continuous Learning */}
          <section className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Continuous Learning</h2>
            <p className="text-gray-600 mb-6">
              Our model improves over time by learning from new threats:
            </p>
            <div className="space-y-4 text-gray-600">
              <p>
                • Every day, thousands of new phishing sites emerge. Our system processes threat intelligence from multiple sources.
              </p>
              <p>
                • User feedback helps us improve. When you report a false positive or threat we missed, the model learns.
              </p>
              <p>
                • Monthly retraining ensures we stay ahead of new attack vectors.
              </p>
            </div>
          </section>

          {/* Privacy & Security */}
          <section className="bg-green-50 rounded-lg p-8 border border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Security</h2>
            <ul className="space-y-3 text-gray-600">
              <li>✓ <strong>No History Storage:</strong> Your browsing history is never saved</li>
              <li>✓ <strong>URL Analysis Only:</strong> We don't analyze page content beyond threat detection</li>
              <li>✓ <strong>Encrypted Transmission:</strong> All data sent via HTTPS</li>
              <li>✓ <strong>Anonymous Data:</strong> No personal information linked to predictions</li>
              <li>✓ <strong>Open Source:</strong> Our code is available for audit on GitHub</li>
            </ul>
          </section>

          {/* CTA */}
          <div className="text-center bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-12">
            <h3 className="text-2xl font-bold mb-4">Ready to experience advanced protection?</h3>
            <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition">
              Add to Chrome Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
