// components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

const Footer = () => {
  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const footerLinks = {
    'Project': [
      { name: 'Features', action: () => handleSectionClick('features') },
      { name: 'Gallery', action: () => handleSectionClick('gallery') },
      { name: 'Testimonials', action: () => handleSectionClick('testimonials') }
    ],
    'Connect': [
      { name: 'GitHub', href: 'https://github.com/siddharth-m7' },
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/siddharthm7/' },
      { name: 'Email', href: 'mailto:siddharth4386@gmail.com' }
    ],
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold">CanvasCraft</span>
            </div>
            <p className="text-gray-400 mb-6">
              A personal project showcasing AI-powered image editing and generation capabilities.
            </p>
            <div className="flex space-x-4">
              {[
                { name: 'GitHub', icon: 'G', href: 'https://github.com/siddharth-m7' },
                { name: 'LinkedIn', icon: 'L', href: 'https://www.linkedin.com/in/siddharthm7/' },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.2, backgroundColor: '#10b981' }}
                  transition={{ duration: 0.2 }}
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-600"
                  title={social.name}
                >
                  <span className="text-xs font-semibold">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-emerald-400 mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.href ? (
                      <motion.a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 5, color: '#10b981' }}
                        className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer"
                      >
                        {link.name}
                      </motion.a>
                    ) : (
                      <motion.button
                        onClick={link.action}
                        whileHover={{ x: 5, color: '#10b981' }}
                        className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer bg-transparent border-none p-0 text-left"
                      >
                        {link.name}
                      </motion.button>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400"
        >
          <p>&copy; 2025 CanvasCraft. Built with ❤️ by Siddharth Mishra.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
