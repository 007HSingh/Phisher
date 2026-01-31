'use client';

import { motion } from 'framer-motion';
import { FiShield, FiClock, FiZap } from 'react-icons/fi';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Browse the Web Safely with{' '}
              <span className="text-gradient">AI-Powered Protection</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              WiseShield AI stops phishing attacks before they happen. Real-time protection powered by machine learning. 99.2% detection rate.
            </p>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">4.8/5 (1,234 reviews)</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <FiZap className="text-green-600" />
                <span>10,000+ Active Users</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <a href="https://chrome.google.com/webstore" target="_blank" rel="noopener noreferrer" className="btn btn-primary text-lg">
                Add to Chrome - It's Free
              </a>
              <button className="btn btn-outline text-lg">
                Watch Demo Video
              </button>
            </motion.div>

            {/* Additional Info */}
            <motion.p className="mt-6 text-gray-500 text-sm" variants={itemVariants}>
              ✓ No credit card required • Install in 30 seconds • Featured on Chrome Web Store
            </motion.p>
          </motion.div>

          {/* Visual Section */}
          <motion.div
            className="relative h-96 bg-white rounded-2xl shadow-2xl p-8 flex items-center justify-center overflow-hidden"
            variants={itemVariants}
          >
            <div className="relative w-full h-full">
              {/* Animated Shield */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <FiShield className="w-32 h-32 text-blue-600 opacity-20" />
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-green-600 rounded-full opacity-80 blur-xl" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Browser Chrome Indicator */}
              <motion.div
                className="absolute top-4 right-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
