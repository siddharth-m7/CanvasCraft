// components/Hero.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Wand2 } from 'lucide-react';

// Import hero images
import aiGeneratedImage from '../../assets/images/hero-section/ai-generated.png';
import imageEnhanceImage from '../../assets/images/hero-section/image-enhance.webp';
import portraitImage from '../../assets/images/hero-section/portrait.jpg';

const Hero = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const navigate = useNavigate();

  const heroImages = [
    {
      id: 1,
      image: aiGeneratedImage,
      alt: "AI Generated Art",
      title: "AI Generated Art",
      description: "Digital artwork created with AI"
    },
    {
      id: 2,
      image: imageEnhanceImage, // Changed from 'src' to 'image'
      alt: "Photo Enhancement", 
      title: "Photo Enhancement",
      description: "Professional photo editing"
    },
    {
      id: 3,
      image: portraitImage, // Changed from 'src' to 'image'
      alt: "Portrait Editing",
      title: "Portrait Editing", 
      description: "Transform your photos"
    }
  ];

  const handleGetStarted = () => {
     // Redirect to editor page
    navigate('/editor');
  };

  const handleExampleClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <section ref={ref} className="pt-20 pb-16 gradient-bg min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-6xl font-bold text-gray-50 mb-6"
            >
              Create Stunning
              <span className="block text-emerald-300">Visual Content</span>
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-emerald-50 mb-8 leading-relaxed"
            >
              AI-powered image editor and generator that transforms your ideas into 
              professional-quality visuals in seconds.
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-50 text-emerald-700 rounded-lg font-semibold hover:bg-white transition-all flex items-center justify-center space-x-2"
              >
                <Wand2 className="h-5 w-5" />
                <span>Start Creating</span>
              </motion.button>

              <motion.button
                onClick={() => handleExampleClick('gallery')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-emerald-200 text-emerald-100 rounded-lg font-semibold hover:bg-emerald-50 hover:text-emerald-700 transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="h-5 w-5" />
                <span>View Examples</span>
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 2, 0, -2, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="rounded-2xl h-96 shadow-2xl relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
            >
              {/* Animated Image Carousel */}
              <motion.div
                animate={{
                  y: [0, -384, -768, 0], // Move by container height (384px = h-96)
                }}
                transition={{
                  duration: 9, // 3 seconds per image
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0"
              >
                {heroImages.map((heroImage, index) => (
                  <div
                    key={heroImage.id}
                    className="h-96 w-full relative"
                  >
                    {/* Image display with error handling like Gallery */}
                    {heroImage.image ? (
                      <img
                        src={heroImage.image}
                        alt={heroImage.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          console.error('Failed to load image:', heroImage.image);
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    
                    {/* Fallback placeholder similar to Gallery */}
                    <div 
                      className={`image-placeholder w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center ${heroImage.image ? 'hidden' : 'flex'}`}
                      style={heroImage.image ? { display: 'none' } : {}}
                    >
                      <div className="text-center">
                        <div className="text-lg font-semibold text-emerald-700 mb-2">
                          {heroImage.title}
                        </div>
                        <div className="text-sm font-medium text-emerald-600">
                          {heroImage.description}
                        </div>
                      </div>
                    </div>
                    
                    {/* Image overlay with title and description */}
                  <div className="absolute inset-0 bg-opacity-50 flex flex-col items-center justify-end pb-6">
                    <div className="text-center text-white drop-shadow-lg">
                      <div className="text-2xl font-bold mb-2 drop-shadow-md">
                        {heroImage.title}
                      </div>
                      <div className="text-sm font-medium opacity-90 drop-shadow-sm">
                        {heroImage.description}
                      </div>
                      </div>
                  </div>

                    
                    {/* Subtle gradient overlay for each image */}
                    <motion.div
                      animate={{
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.5
                      }}
                      className="absolute inset-0 bg-gradient-to-tr from-emerald-400/20 to-teal-400/20"
                    />
                  </div>
                ))}
              </motion.div>

              {/* Progress indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {heroImages.map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      backgroundColor: [
                        '#cbd5e1', // slate-300
                        '#10b981', // emerald-500 
                        '#cbd5e1'
                      ],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 9,
                      repeat: Infinity,
                      delay: index * 3,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 rounded-full bg-slate-300"
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                x: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center shadow-lg"
            >
              <Sparkles className="h-8 w-8 text-emerald-600" />
            </motion.div>

            {/* Additional floating element */}
            <motion.div
              animate={{ 
                y: [0, 8, 0],
                x: [0, -4, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg opacity-80"
            >
              <Wand2 className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
