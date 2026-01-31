'use client';

import { motion } from 'framer-motion';
import { FiAlertTriangle, FiTrendingUp, FiDollarSign } from 'react-icons/fi';

export default function ProblemStatement() {
  const stats = [
    {
      icon: FiTrendingUp,
      number: '3.4B',
      label: 'phishing emails sent daily',
    },
    {
      icon: FiAlertTriangle,
      number: '90%',
      label: 'of breaches start with phishing',
    },
    {
      icon: FiDollarSign,
      number: '$12K',
      label: 'average cost per attack',
    },
  ];

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
            Phishing Attacks Are Getting Smarter.{' '}
            <span className="text-gradient">Are You Protected?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every day, millions of users fall victim to sophisticated phishing attacks. Traditional security tools often miss them.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <Icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <p className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border-l-4 border-red-500"
        >
          <p className="text-gray-600 text-lg mb-4">
            <span className="font-semibold text-gray-900">Real Story:</span> Sarah received an email that looked exactly like her bank. It asked her to verify her account. She clicked the link, entered her details, and didn't realize the danger until fraudsters had stolen $5,000 from her account.
          </p>
          <p className="text-gray-600">
            This happens to thousands of people every day. But with WiseShield AI, Sarah's browser would have flagged that email as phishing before she even clicked.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
