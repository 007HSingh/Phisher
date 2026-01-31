'use client';

import Link from 'next/link';
import { FiTwitter, FiLinkedin, FiGithub, FiMail } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-green-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <span className="text-lg font-bold">WiseShield</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered phishing protection for a safer web.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/download" className="hover:text-white transition">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition">
                  How It Works
                </Link>
              </li>
              <li>
                <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                  Chrome Web Store
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-3">
              Security tips and product updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-lg text-sm outline-none"
              />
              <button className="px-4 py-2 bg-blue-600 rounded-r-lg text-sm font-semibold hover:bg-blue-700 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; {currentYear} WiseShield AI. All rights reserved.</p>
              <p className="mt-2">
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
                {' • '}
                <Link href="/terms" className="hover:text-white transition">
                  Terms of Service
                </Link>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex space-x-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <FiTwitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <FiLinkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                <FiGithub size={20} />
              </a>
              <a href="mailto:support@wiseshield.ai" className="text-gray-400 hover:text-white transition">
                <FiMail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
