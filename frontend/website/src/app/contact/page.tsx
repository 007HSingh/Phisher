import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact WiseShield AI - Support & Partnerships',
  description: 'Get in touch with WiseShield AI for support, bug reports, or partnerships',
};

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-12">
          Have a question? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-600" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-600" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Category</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-600">
                  <option>Technical Support</option>
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>Partnership</option>
                  <option>Press Inquiry</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-blue-600" />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Support */}
            <div className="bg-blue-50 rounded-lg p-8 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Support</h3>
              <p className="text-gray-600 mb-4">
                Having issues? Our support team responds within 24 hours.
              </p>
              <a href="mailto:support@wiseshield.ai" className="text-blue-600 font-semibold hover:text-blue-700 transition">
                support@wiseshield.ai
              </a>
            </div>

            {/* Report Threat */}
            <div className="bg-red-50 rounded-lg p-8 border-l-4 border-red-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Report a Phishing Site</h3>
              <p className="text-gray-600 mb-4">
                Help us stay ahead of threats by reporting suspicious sites.
              </p>
              <button className="btn btn-outline">
                Report Threat
              </button>
            </div>

            {/* Partnerships */}
            <div className="bg-green-50 rounded-lg p-8 border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Partnerships & Press</h3>
              <p className="text-gray-600 mb-4">
                Interested in a partnership or have a press inquiry?
              </p>
              <a href="mailto:partnerships@wiseshield.ai" className="text-green-600 font-semibold hover:text-green-700 transition">
                partnerships@wiseshield.ai
              </a>
            </div>

            {/* FAQ Link */}
            <div className="bg-purple-50 rounded-lg p-8 border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-gray-900 mb-4">FAQ</h3>
              <p className="text-gray-600 mb-4">
                Check our FAQ for quick answers to common questions.
              </p>
              <a href="/#faq" className="text-purple-600 font-semibold hover:text-purple-700 transition">
                View FAQ →
              </a>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-8">
            Follow us on social media for the latest security tips and product updates.
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
