import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download WiseShield AI - Installation Guide',
  description: 'Easy step-by-step installation guide for WiseShield AI Chrome extension',
};

export default function DownloadPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Installation Guide</h1>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 1: Go to Chrome Web Store</h2>
            <p className="text-gray-600 mb-4">
              Open Chrome and visit the Chrome Web Store to find WiseShield AI.
            </p>
            <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Open Chrome Web Store
            </a>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 2: Click "Add to Chrome"</h2>
            <p className="text-gray-600 mb-4">
              Find WiseShield AI and click the "Add to Chrome" button. Review the permissions dialog carefully.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 3: Confirm Installation</h2>
            <p className="text-gray-600 mb-4">
              Click "Confirm" on the permission dialog. The extension will be installed automatically.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-yellow-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Step 4: Pin the Extension</h2>
            <p className="text-gray-600 mb-4">
              Click the extensions icon in your toolbar and pin WiseShield AI for easy access.
            </p>
          </div>

          {/* System Requirements */}
          <div className="bg-blue-50 rounded-lg p-8 mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">System Requirements</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Chrome version 88+</li>
              <li>✓ 50MB free storage</li>
              <li>✓ Internet connection</li>
            </ul>
          </div>

          {/* Coming Soon */}
          <div className="bg-green-50 rounded-lg p-8 mt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Coming Soon</h3>
            <p className="text-gray-600 mb-4">
              Firefox and Edge support coming in Q2 2024. Enter your email to be notified.
            </p>
            <div className="flex gap-2">
              <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-2 border border-gray-300 rounded-lg" />
              <button className="btn btn-primary">Notify Me</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
