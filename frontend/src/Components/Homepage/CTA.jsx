// components/CTA.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const CTA = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 gradient-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Ready to Create Something Amazing?
        </motion.h2>
        
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-emerald-100 mb-8 leading-relaxed"
        >
          Join millions of creators who trust CanvasCraft for their visual content needs.
          Transform your ideas into stunning visuals today!
        </motion.p>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.08, 
              boxShadow: '0 15px 35px rgba(0,0,0,0.3)' 
            }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 bg-white text-emerald-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center space-x-3 shadow-xl"
          >
            <span>Get Started</span>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowRightIcon className="h-6 w-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
