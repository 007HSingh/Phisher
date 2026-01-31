'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: 'How does WiseShield AI detect phishing sites?',
      answer:
        'WiseShield AI uses advanced machine learning trained on millions of URLs. It analyzes 50+ signals including domain age, SSL certificates, URL patterns, content analysis, and reputation scores to identify phishing attempts in real-time.',
    },
    {
      question: 'Will it slow down my browsing?',
      answer:
        'No. WiseShield AI is optimized for performance with <100ms analysis time. It uses minimal system resources and won\'t impact your browsing speed.',
    },
    {
      question: 'What data does WiseShield collect?',
      answer:
        'We\'re privacy-first. We only analyze URLs you visit and don\'t store your browsing history. No personal data is collected beyond what\'s necessary for threat detection.',
    },
    {
      question: 'Is it really free?',
      answer:
        'Yes! WiseShield AI is completely free. No credit card required, no premium version, no hidden costs. We\'re committed to making security accessible to everyone.',
    },
    {
      question: 'Does it work on mobile browsers?',
      answer:
        'Currently, WiseShield is available for desktop Chrome. We\'re working on mobile support for Chrome and other browsers.',
    },
    {
      question: 'How is it different from Google Safe Browsing?',
      answer:
        'While Google Safe Browsing is reactive, WiseShield AI is proactive. Our ML model catches zero-day attacks and sophisticated phishing attempts that traditional methods miss.',
    },
    {
      question: 'Can I whitelist certain sites?',
      answer:
        'Yes! You can manage your whitelist in the extension settings. You can also dismiss individual warnings if you trust a site.',
    },
    {
      question: 'How often is the threat database updated?',
      answer:
        'Our threat intelligence feeds update continuously. The ML model learns from new threats in real-time, ensuring you\'re always protected against the latest attacks.',
    },
  ];

  return (
    <section className="section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about WiseShield AI
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition bg-white"
              >
                <span className="text-left font-semibold text-gray-900">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="w-5 h-5 text-blue-600" />
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden bg-blue-50"
              >
                <div className="px-6 py-4 text-gray-600">{faq.answer}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Didn't find your answer?
          </h3>
          <p className="text-gray-600 mb-6">
            Contact our support team. We respond within 24 hours.
          </p>
          <a href="mailto:support@wiseshield.ai" className="btn btn-primary">
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}
