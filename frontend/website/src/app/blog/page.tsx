import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'WiseShield AI Blog - Security Tips & Updates',
  description: 'Read the latest articles on phishing protection and cybersecurity',
};

const blogPosts = [
  {
    slug: 'top-10-phishing-tactics-2024',
    title: 'Top 10 Phishing Tactics in 2024',
    date: 'January 30, 2024',
    excerpt: 'Learn about the most common phishing techniques attackers use today and how to protect yourself.',
    category: 'Security Tips',
  },
  {
    slug: 'identify-fake-website',
    title: 'How to Identify a Fake Website',
    date: 'January 25, 2024',
    excerpt: 'A comprehensive guide to spotting suspicious websites before you enter your credentials.',
    category: 'Security Tips',
  },
  {
    slug: 'why-antivirus-isnt-enough',
    title: 'Why Traditional Antivirus Isn\'t Enough',
    date: 'January 20, 2024',
    excerpt: 'Discover why your antivirus software might not protect you from modern phishing attacks.',
    category: 'Industry News',
  },
  {
    slug: 'ssl-certificates-explained',
    title: 'Understanding SSL Certificates',
    date: 'January 15, 2024',
    excerpt: 'What are SSL certificates, why they matter, and how to check if a website is secure.',
    category: 'Educational',
  },
  {
    slug: 'real-stories-blocked-attacks',
    title: 'Real Stories: Phishing Attacks We Blocked',
    date: 'January 10, 2024',
    excerpt: 'Read real-world examples of phishing attempts that WiseShield AI successfully caught.',
    category: 'Case Studies',
  },
  {
    slug: 'ai-vs-phishing',
    title: 'Why AI is the Future of Phishing Detection',
    date: 'January 5, 2024',
    excerpt: 'Exploring how machine learning is revolutionizing cybersecurity and threat detection.',
    category: 'Technology',
  },
];

export default function BlogPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">WiseShield AI Blog</h1>
          <p className="text-xl text-gray-600">
            Security tips, threat intelligence, and product updates
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="card hover:shadow-xl transition">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold mb-3">
                {post.category}
              </span>
              <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{post.date}</p>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <a href={`/blog/${post.slug}`} className="text-blue-600 font-semibold hover:text-blue-700 transition">
                Read More →
              </a>
            </article>
          ))}
        </div>

        {/* Resources Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📄</div>
              <h3 className="font-bold text-gray-900 mb-2">Phishing Awareness Guide</h3>
              <p className="text-gray-600 text-sm mb-4">
                Download our comprehensive guide to staying safe online
              </p>
              <button className="btn btn-outline">Download PDF</button>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="font-bold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm mb-4">
                Watch how to use WiseShield AI effectively
              </p>
              <button className="btn btn-outline">Watch Videos</button>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-bold text-gray-900 mb-2">Security Checklist</h3>
              <p className="text-gray-600 text-sm mb-4">
                Essential security steps everyone should take
              </p>
              <button className="btn btn-outline">View Checklist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
