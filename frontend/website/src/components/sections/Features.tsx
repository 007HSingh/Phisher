'use client';

import { motion } from 'framer-motion';
import { FiCpu, FiZap, FiAlertTriangle, FiLock, FiFeather, FiRefreshCw } from 'react-icons/fi';

export default function Features() {
  const features = [
    {
      icon: FiCpu,
      title: 'AI-Powered Detection',
      description: 'Machine learning trained on millions of URLs detects even zero-day phishing attacks',
    },
    {
      icon: FiZap,
      title: 'Real-Time Protection',
      description: 'Instant analysis with <100ms latency. No browsing slowdown',
    },
    {
      icon: FiAlertTriangle,
      title: 'Smart Warnings',
      description: 'Color-coded risk levels: Safe, Suspicious, Dangerous with detailed explanations',
    },
    {
      icon: FiLock,
      title: 'Privacy First',
      description: 'No browsing history stored. Your data stays private',
    },
    {
      icon: FiFeather,
      title: 'Lightweight & Fast',
      description: 'Minimal memory usage. Won\'t slow down your browser',
    },
    {
      icon: FiRefreshCw,
      title: 'Always Updated',
      description: 'Continuous learning from latest threat intelligence',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="section bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Powerful Protection.{' '}
            <span className="text-gradient">Effortless Experience.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Six powerful features working together to keep you safe.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={itemVariants} className="card">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.5 }}
                >
                  <Icon className="w-10 h-10 text-blue-600 mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
