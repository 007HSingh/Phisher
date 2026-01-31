import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About WiseShield AI - Our Mission',
  description: 'Learn about WiseShield AI mission, team, and technology partners',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About WiseShield AI</h1>
          <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600">
              To make the internet safer for everyone through accessible, AI-powered security.
            </p>
            <p className="text-gray-600 mt-4">
              We believe that advanced security shouldn't be expensive or complicated. By harnessing the power of machine learning, we're democratizing phishing protection for millions of users worldwide.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              WiseShield AI was founded by a team of cybersecurity experts and machine learning engineers who were frustrated with existing security solutions. Every day, they saw sophisticated phishing attacks slip through traditional defenses, and ordinary users getting victimized.
            </p>
            <p>
              In 2022, we set out to build something different. We wanted a security tool that was:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Powerful enough to catch zero-day attacks</li>
              <li>Smart enough to minimize false positives</li>
              <li>Fast enough to never slow you down</li>
              <li>Private enough to protect your data</li>
              <li>Free enough for everyone to use</li>
            </ul>
            <p>
              Today, WiseShield AI protects over 10,000 users across 45+ countries, and our ML model has blocked over 500,000 phishing attempts.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We're just getting started. Here's what's coming:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">2024 Roadmap</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>✓ Firefox & Edge support</li>
                <li>✓ Mobile browser protection</li>
                <li>✓ Advanced analytics dashboard</li>
                <li>✓ Enterprise security features</li>
              </ul>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 mb-2">Long-term Goals</h3>
              <ul className="text-gray-600 text-sm space-y-2">
                <li>✓ Expand to all browsers</li>
                <li>✓ Enterprise solutions</li>
                <li>✓ AI-powered email security</li>
                <li>✓ Global threat intelligence network</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Leadership Team</h2>
          <p className="text-gray-600 mb-8">
            Our team combines deep expertise in cybersecurity, machine learning, and product development.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Team members would go here */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-green-400 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">Founder & CEO</h3>
              <p className="text-gray-600 text-sm mt-1">
                15+ years in cybersecurity, ex-Google Security
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900">CTO & ML Engineer</h3>
              <p className="text-gray-600 text-sm mt-1">
                PhD in Machine Learning, ex-Meta AI Research
              </p>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Partners & Integrations</h2>
          <p className="text-gray-600 mb-6">
            We work with leading security researchers and threat intelligence providers.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-gray-600">
            <div>
              <div className="font-bold text-gray-900">VirusTotal</div>
              <p className="text-sm">Threat Intelligence</p>
            </div>
            <div>
              <div className="font-bold text-gray-900">PhishTank</div>
              <p className="text-sm">Phishing Database</p>
            </div>
            <div>
              <div className="font-bold text-gray-900">URLhaus</div>
              <p className="text-sm">Malware Hosting</p>
            </div>
            <div>
              <div className="font-bold text-gray-900">Google Safe Browsing</div>
              <p className="text-sm">Integration</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
