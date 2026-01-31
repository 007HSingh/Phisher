'use client';

import { motion } from 'framer-motion';
import { FiSearch, FiCpu, FiShield } from 'react-icons/fi';

export default function HowItWorks() {
  const steps = [
    {
      icon: FiSearch,
      title: 'Real-Time Scanning',
      description: 'Every URL is instantly analyzed as you browse',
      number: '01',
    },
    {
      icon: FiCpu,
      title: 'AI Analysis',
      description: 'Our ML model examines 50+ signals to detect threats',
      number: '02',
    },
    {
      icon: FiShield,
      title: 'Instant Protection',
      description: 'Get warned before visiting dangerous sites',
      number: '03',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Three Layers of Protection.{' '}
            <span className="text-gradient">Zero Hassle.</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our three-layer system works seamlessly in the background to keep you safe.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className="card h-full">
                  <div className="absolute top-4 right-4 text-5xl font-bold text-gray-100">
                    {step.number}
                  </div>
                  <Icon className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-600 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Architecture Diagram Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Simple Architecture, Powerful Results
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Browser Extension → API Gateway → ML Model → Real-time Threat Database → Instant Warning
          </p>
          <div className="inline-block bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-center space-x-4 text-sm font-semibold">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">Browser</span>
              <span>→</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full">API</span>
              <span>→</span>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full">ML Model</span>
              <span>→</span>
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full">Warning</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
