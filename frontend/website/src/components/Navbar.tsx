'use client';

import Link from 'next/link';
import { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold text-gray-900">WiseShield</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              href="/how-it-works"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              How It Works
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="btn btn-outline">Sign In</button>
            <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Add to Chrome
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
              Home
            </Link>
            <Link href="/how-it-works" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
              How It Works
            </Link>
            <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
              Blog
            </Link>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
              About
            </Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100">
              Contact
            </Link>
            <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="block w-full text-left px-3 py-2 rounded-md btn btn-primary">
              Add to Chrome
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
