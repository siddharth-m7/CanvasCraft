// components/Header.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Palette } from 'lucide-react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleGetStarted = () => {
    navigate('/signup');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  const navigationItems = [
    { name: 'Features', id: 'features' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Testimonials', id: 'testimonials' }, // Added testimonials
    { name: 'About', id: 'about' }
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-white shadow-lg fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={handleLogoClick}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Palette className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-black">CanvasCraft</span>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleSectionClick(item.id)}
                whileHover={{ scale: 1.1, color: '#059669' }}
                className="text-black hover:text-green-600 transition-colors bg-transparent border-none font-medium cursor-pointer"
              >
                {item.name}
              </motion.button>
            ))}
          </nav>

          <div className="hidden md:flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignIn}
              className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              Sign In
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Get Started
            </motion.button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleSectionClick(item.id)}
                className="block w-full text-left text-black hover:text-green-600 bg-transparent border-none font-medium"
              >
                {item.name}
              </button>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 space-y-2 border-t border-gray-200">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleSignIn();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
              >
                Sign In
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  handleGetStarted();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
