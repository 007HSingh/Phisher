'use client';

import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

export default function SocialProof() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      title: 'Small Business Owner',
      quote: 'WiseShield caught a PayPal phishing email that looked completely legitimate. Saved me from a major security breach!',
      rating: 5,
    },
    {
      name: 'Michael Torres',
      title: 'Software Developer',
      quote: 'Fast, lightweight, and actually works. This is the security extension I\'ve been looking for.',
      rating: 5,
    },
    {
      name: 'Emily Watson',
      title: 'Marketing Executive',
      quote: 'Our entire team uses it. It blocked multiple threats in the first week. Highly recommended!',
      rating: 5,
    },
    {
      name: 'James Kim',
      title: 'Freelance Writer',
      quote: 'No slowdown, no intrusive notifications. Just quiet, effective protection. Perfect!',
      rating: 5,
    },
  ];

  const stats = [
    { label: 'Total Downloads', value: '10,000+' },
    { label: 'Threats Blocked', value: '500K+' },
    { label: 'Average Rating', value: '4.8/5' },
    { label: 'Active Countries', value: '45+' },
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
            Trusted by Thousands of Users{' '}
            <span className="text-gradient">Worldwide</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
              <div className="flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
