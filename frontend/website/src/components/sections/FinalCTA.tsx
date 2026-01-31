'use client';

import { motion } from 'framer-motion';

export default function FinalCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-green-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Browsing Safely Today
          </h2>
          <p className="text-xl text-blue-100 mb-4">
            Join 10,000+ users protected by WiseShield AI
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition shadow-lg">
              Add to Chrome - Free Forever
            </a>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-blue-600 transition">
              Learn More About Our Technology
            </button>
          </div>

          <p className="text-blue-100 text-sm">
            ✓ No credit card required • ✓ Install in 30 seconds • ✓ Featured on Chrome Web Store
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-wrap justify-center gap-6 items-center text-sm"
        >
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              ✓
            </div>
            <span>Chrome Web Store Certified</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              ✓
            </div>
            <span>99.2% Detection Rate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              ✓
            </div>
            <span>Privacy First Approach</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
