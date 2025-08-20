// components/Features.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  PaintBrushIcon, 
  SparklesIcon, 
  CloudArrowUpIcon,
  DevicePhoneMobileIcon,
  PhotoIcon,
  SwatchIcon,
  LightBulbIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: PaintBrushIcon,
      title: 'AI-Powered Editing',
      description: 'Advanced AI algorithms for intelligent image enhancement and manipulation.',
      bgColor: 'bg-gradient-to-br from-emerald-100 to-emerald-200',
      iconBg: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
      iconColor: 'text-white',
      hoverColor: 'hover:from-emerald-200 hover:to-emerald-300'
    },
    {
      icon: SparklesIcon,
      title: 'Magic Generator',
      description: 'Create stunning visuals from text descriptions using cutting-edge AI.',
      bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
      iconBg: 'bg-gradient-to-r from-purple-500 to-purple-600',
      iconColor: 'text-white',
      hoverColor: 'hover:from-purple-200 hover:to-purple-300'
    },
    {
      icon: CloudArrowUpIcon,
      title: 'Cloud Storage',
      description: 'Secure cloud storage with seamless sync across all your devices.',
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
      iconBg: 'bg-gradient-to-r from-blue-500 to-blue-600',
      iconColor: 'text-white',
      hoverColor: 'hover:from-blue-200 hover:to-blue-300'
    },
    {
      icon: DevicePhoneMobileIcon,
      title: 'Mobile Optimized',
      description: 'Edit and create on any device with our responsive design.',
      bgColor: 'bg-gradient-to-br from-orange-100 to-orange-200',
      iconBg: 'bg-gradient-to-r from-orange-500 to-orange-600',
      iconColor: 'text-white',
      hoverColor: 'hover:from-orange-200 hover:to-orange-300'
    },
    {
      icon: PhotoIcon,
      title: 'Multiple Formats',
      description: 'Support for all major image formats including PNG, JPG, SVG, and more.',
      bgColor: 'bg-gradient-to-br from-pink-100 to-pink-200',
      iconBg: 'bg-gradient-to-r from-pink-500 to-pink-600',
      iconColor: 'text-white',
      hoverColor: 'hover:from-pink-200 hover:to-pink-300'
    },
    {
      icon: SwatchIcon,
      title: 'Color Tools',
      description: 'Professional color grading and palette management tools.',
      bgColor: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
      iconBg: 'bg-gradient-to-r from-indigo-500 to-indigo-600',
      iconColor: 'text-white',
      hoverColor: 'hover:from-indigo-200 hover:to-indigo-300'
    }
  ];

  // Left side floating elements
  const LeftFloatingBubble = ({ delay = 0, size = 'w-8 h-8', color = 'bg-emerald-400' }) => (
    <motion.div
      initial={{ opacity: 0, x: -100, y: 100, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.8, 0.4, 0],
        x: [-100, -50, -80, -30, -60],
        y: [100, -50, -200, -300, -150],
        scale: [0, 1.2, 0.8, 1.5, 0],
        rotate: [0, 180, 360, 540],
      }}
      transition={{
        duration: 12,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute left-0 ${size} ${color} rounded-full shadow-lg`}
      style={{ filter: 'blur(0.5px)' }}
    />
  );

  // Right side floating elements
  const RightFloatingBubble = ({ delay = 0, size = 'w-8 h-8', color = 'bg-purple-400' }) => (
    <motion.div
      initial={{ opacity: 0, x: 100, y: 100, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.8, 0.4, 0],
        x: [100, 50, 80, 30, 60],
        y: [100, -50, -200, -300, -150],
        scale: [0, 1.2, 0.8, 1.5, 0],
        rotate: [0, -180, -360, -540],
      }}
      transition={{
        duration: 12,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute right-0 ${size} ${color} rounded-full shadow-lg`}
      style={{ filter: 'blur(0.5px)' }}
    />
  );

  // Left side squares
  const LeftFloatingSquare = ({ delay = 0, size = 'w-10 h-10', color = 'border-emerald-400' }) => (
    <motion.div
      initial={{ opacity: 0, rotate: 0, scale: 0, x: -100 }}
      animate={{
        opacity: [0, 0.7, 0.9, 0.5, 0],
        rotate: [0, 90, 180, 270, 360],
        scale: [0, 1.5, 1, 2, 0],
        x: [-100, -60, -80, -40, -70],
        y: [0, -60, 40, -100, 80],
      }}
      transition={{
        duration: 15,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute left-0 ${size} ${color} border-4 rounded-lg shadow-lg`}
      style={{ filter: 'blur(0.3px)' }}
    />
  );

  // Right side squares
  const RightFloatingSquare = ({ delay = 0, size = 'w-10 h-10', color = 'border-purple-400' }) => (
    <motion.div
      initial={{ opacity: 0, rotate: 0, scale: 0, x: 100 }}
      animate={{
        opacity: [0, 0.7, 0.9, 0.5, 0],
        rotate: [0, -90, -180, -270, -360],
        scale: [0, 1.5, 1, 2, 0],
        x: [100, 60, 80, 40, 70],
        y: [0, -60, 40, -100, 80],
      }}
      transition={{
        duration: 15,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute right-0 ${size} ${color} border-4 rounded-lg shadow-lg`}
      style={{ filter: 'blur(0.3px)' }}
    />
  );

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Side-focused Background Animation Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Left side animations */}
        <div className="absolute left-0 top-0 w-32 h-full">
          <LeftFloatingBubble delay={0} size="w-16 h-16" color="bg-gradient-to-r from-emerald-400 to-emerald-500" />
          <LeftFloatingBubble delay={2} size="w-12 h-12" color="bg-gradient-to-r from-blue-400 to-blue-500" />
          <LeftFloatingBubble delay={4} size="w-20 h-20" color="bg-gradient-to-r from-indigo-400 to-indigo-500" />
          <LeftFloatingBubble delay={6} size="w-14 h-14" color="bg-gradient-to-r from-emerald-300 to-emerald-400" />
          <LeftFloatingBubble delay={8} size="w-10 h-10" color="bg-gradient-to-r from-blue-300 to-blue-400" />
          
          <LeftFloatingSquare delay={1} size="w-16 h-16" color="border-emerald-400" />
          <LeftFloatingSquare delay={3} size="w-12 h-12" color="border-blue-400" />
          <LeftFloatingSquare delay={5} size="w-18 h-18" color="border-indigo-400" />
        </div>

        {/* Right side animations */}
        <div className="absolute right-0 top-0 w-32 h-full">
          <RightFloatingBubble delay={1} size="w-18 h-18" color="bg-gradient-to-r from-purple-400 to-purple-500" />
          <RightFloatingBubble delay={3} size="w-14 h-14" color="bg-gradient-to-r from-orange-400 to-orange-500" />
          <RightFloatingBubble delay={5} size="w-22 h-22" color="bg-gradient-to-r from-pink-400 to-pink-500" />
          <RightFloatingBubble delay={7} size="w-12 h-12" color="bg-gradient-to-r from-purple-300 to-purple-400" />
          <RightFloatingBubble delay={9} size="w-16 h-16" color="bg-gradient-to-r from-orange-300 to-orange-400" />
          
          <RightFloatingSquare delay={2} size="w-14 h-14" color="border-purple-400" />
          <RightFloatingSquare delay={4} size="w-20 h-20" color="border-orange-400" />
          <RightFloatingSquare delay={6} size="w-16 h-16" color="border-pink-400" />
        </div>

        {/* Additional side geometric shapes */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.8, 1.2, 2, 1],
            opacity: [0.3, 0.7, 0.5, 0.8, 0.3],
            x: [-50, -20, -40, -10, -30],
            y: [0, -80, 60, -120, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-16 left-8 w-24 h-24 border-4 border-emerald-400 rounded-2xl opacity-40 shadow-xl"
        />
        
        <motion.div
          animate={{
            rotate: [0, -360],
            scale: [0.5, 2, 1, 2.5, 0.5],
            opacity: [0.2, 0.8, 0.6, 0.9, 0.2],
            x: [50, 20, 40, 10, 30],
            y: [0, 100, -60, 140, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-24 right-8 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-50 shadow-2xl"
        />

        {/* Side pulsing circles */}
        <motion.div
          animate={{
            scale: [1, 3, 1.5, 4, 1],
            opacity: [0.1, 0.6, 0.3, 0.8, 0.1],
            rotate: [0, 180, 90, 270, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/3 left-4 w-28 h-28 border-6 border-emerald-300 rounded-full opacity-30"
        />

        <motion.div
          animate={{
            scale: [0.5, 2.5, 1, 3.5, 0.5],
            opacity: [0.2, 0.7, 0.4, 0.9, 0.2],
            rotate: [360, 0, 180, -90, 360],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-4 w-32 h-32 border-8 border-purple-300 rounded-full opacity-40"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full mb-6"
          >
            <BoltIcon className="h-8 w-8 text-white" />
          </motion.div>
          
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
            Powerful Features
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to create, edit, and enhance your visual content with 
            <span className="text-emerald-600 font-semibold"> cutting-edge technology</span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ 
                y: -15,
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                scale: 1.02
              }}
              className={`${feature.bgColor} ${feature.hoverColor} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 backdrop-blur-sm relative overflow-hidden`}
            >
              {/* Card Background Pattern */}
              <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full border-2 border-gray-400 rounded-full"
                />
              </div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.2, 
                  rotate: [0, -5, 5, 0],
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                }}
                transition={{ duration: 0.3 }}
                className={`w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
              >
                <feature.icon className={`h-7 w-7 ${feature.iconColor}`} />
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect Indicator */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Additional decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex justify-center mt-16"
        >
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 border-2 border-emerald-500 rounded-full flex items-center justify-center"
            >
              <LightBulbIcon className="h-4 w-4 text-emerald-500" />
            </motion.div>
            <span className="text-gray-600 font-medium">Innovative Solutions</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 bg-emerald-500 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
