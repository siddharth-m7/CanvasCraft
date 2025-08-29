// components/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Palette } from 'lucide-react';
import useAuthStore from '../../stores/authStore';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleGetStarted = () => {
    navigate('/editor');
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
        if (isAuthenticated) {
            logout();
        }
    };

  const handleUserProfile = () => {
    navigate('/editor');
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSignIn = () => {
    navigate('/login'); // 👈 define this route in your app
  };

  const handleSectionClick = (sectionId) => {
    if(sectionId === 'generate'){
      navigate('/generate');
      setIsOpen(false);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsOpen(false);
  };

  const navigationItems = [
    { name: 'Features', id: 'features' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'About', id: 'about' },
    { name: 'AI Image Generator', id:'generate',href: '/generate' }
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
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={handleLogoClick}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <Palette className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-black">CanvasCraft</span>
          </motion.div>

          {/* Desktop Nav */}
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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            {isAuthenticated ? (
              <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProfileClick}
                className="flex items-center space-x-2 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                title="Go to Profile"
              >
                <UserCircleIcon className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {user?.username || user?.email?.split('@')[0] || 'User'}
                </span>
              </motion.button>
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Logout
                </motion.button>
                </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
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
              {isAuthenticated ? (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleUserProfile();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  <UserCircleIcon className="h-5 w-5" />
                  <span>
                    Go to Editor ({user?.username || user?.email?.split('@')[0] || 'User'})
                  </span>
                </motion.button>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
