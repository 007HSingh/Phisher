'use client';

import { motion } from 'framer-motion';
import { FiCode, FiDatabase, FiCpu, FiActivity } from 'react-icons/fi';

export default function TechnologyDeepDive() {
  const techStack = [
    { icon: FiActivity, name: 'Chrome Extension API', description: 'Latest Chrome APIs' },
    { icon: FiCode, name: 'Flask Backend', description: 'Scalable backend' },
    { icon: FiCpu, name: 'TensorFlow/scikit-learn', description: 'ML framework' },
    { icon: FiDatabase, name: 'Threat Intelligence', description: 'Real-time feeds' },
  ];

  const features = [
    'Domain age analysis',
    'SSL certificate validation',
    'URL pattern recognition',
    'Content analysis',
    'Form detection',
    'Link verification',
    'Blacklist checking',
    'Typosquatting detection',
    'WHOIS data analysis',
    'DNS record checking',
    'Brand impersonation detection',
    'Community reporting',
  ];

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
            Built on Cutting-Edge{' '}
            <span className="text-gradient">Technology</span>
          </h2>
        </motion.div>

        {/* Tech Stack */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {techStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ translateY: -10 }}
                className="card text-center"
              >
                <Icon className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 text-sm">{tech.name}</h3>
                <p className="text-gray-600 text-xs">{tech.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 50+ Data Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            50+ Data Points Analyzed Per URL
          </h3>
          <p className="text-gray-600 text-center mb-8">
            Our ML model examines dozens of signals to make accurate predictions
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-3 text-center shadow-sm"
              >
                <p className="text-sm text-gray-600 font-medium">{feature}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Accuracy Metrics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="card text-center">
            <p className="text-4xl font-bold text-green-600 mb-2">99.2%</p>
            <p className="text-gray-600">Detection Rate</p>
          </div>
          <div className="card text-center">
            <p className="text-4xl font-bold text-blue-600 mb-2">&lt;1%</p>
            <p className="text-gray-600">False Positive Rate</p>
          </div>
          <div className="card text-center">
            <p className="text-4xl font-bold text-purple-600 mb-2">&lt;100ms</p>
            <p className="text-gray-600">Processing Time</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
