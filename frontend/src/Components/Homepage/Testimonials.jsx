// components/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { StarIcon } from '@heroicons/react/24/solid';

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Graphic Designer',
      content: 'CanvasCraft has revolutionized my workflow. The AI features save me hours of work.',
      rating: 5,
      avatar: 'SJ'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Content Creator',
      content: 'The quality of AI-generated images is incredible. Perfect for social media content.',
      rating: 5,
      avatar: 'MC'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Marketing Manager',
      content: 'Easy to use interface with professional results. Our team loves it!',
      rating: 5,
      avatar: 'ED'
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      role: 'Digital Artist',
      content: 'The AI art generation is mind-blowing. It sparks creativity like nothing else.',
      rating: 5,
      avatar: 'AR'
    },
    {
      id: 5,
      name: 'Lisa Wang',
      role: 'Social Media Manager',
      content: 'Creating engaging visuals has never been easier. CanvasCraft is a game-changer.',
      rating: 5,
      avatar: 'LW'
    },
    {
      id: 6,
      name: 'David Thompson',
      role: 'Freelance Designer',
      content: 'From concept to completion in minutes. This tool has transformed my business.',
      rating: 5,
      avatar: 'DT'
    },
    {
      id: 7,
      name: 'Jennifer Kim',
      role: 'Brand Manager',
      content: 'Consistent, high-quality results every time. Our brand visuals have never looked better.',
      rating: 5,
      avatar: 'JK'
    }
  ];

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  // Background animation components
  const FloatingShape = ({ delay = 0, size = 'w-8 h-8', position = 'top-10 left-10', color = 'bg-emerald-200' }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{
        opacity: [0, 0.4, 0.6, 0.3, 0],
        scale: [0, 1.2, 0.8, 1.5, 0],
        rotate: [0, 180, 360, 540],
        x: [0, 30, -20, 40, 0],
        y: [0, -40, 20, -60, 0],
      }}
      transition={{
        duration: 12,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute ${position} ${size} ${color} rounded-full opacity-30`}
    />
  );

  const FloatingCircle = ({ delay = 0, size = 'w-6 h-6', position = 'top-20 right-20' }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.5, 0.7, 0.4, 0],
        scale: [0, 2, 1, 2.5, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 15,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={`absolute ${position} ${size} border-2 border-emerald-300 rounded-full opacity-20`}
    />
  );

  return (
    <section ref={ref} className="py-20 bg-gray-50 overflow-hidden relative">
      {/* Simple Background Animations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating shapes */}
        <FloatingShape delay={0} size="w-12 h-12" position="top-16 left-16" color="bg-emerald-200" />
        <FloatingShape delay={2} size="w-8 h-8" position="top-32 left-1/3" color="bg-green-200" />
        <FloatingShape delay={4} size="w-10 h-10" position="top-48 left-2/3" color="bg-teal-200" />
        <FloatingShape delay={6} size="w-6 h-6" position="bottom-32 left-1/4" color="bg-emerald-300" />
        <FloatingShape delay={8} size="w-14 h-14" position="bottom-16 left-3/4" color="bg-green-300" />

        <FloatingShape delay={1} size="w-9 h-9" position="top-20 right-20" color="bg-teal-200" />
        <FloatingShape delay={3} size="w-11 h-11" position="top-40 right-1/3" color="bg-emerald-200" />
        <FloatingShape delay={5} size="w-7 h-7" position="top-64 right-1/2" color="bg-green-200" />
        <FloatingShape delay={7} size="w-13 h-13" position="bottom-40 right-1/4" color="bg-teal-300" />
        <FloatingShape delay={9} size="w-8 h-8" position="bottom-20 right-16" color="bg-emerald-300" />

        {/* Floating circles */}
        <FloatingCircle delay={0.5} size="w-16 h-16" position="top-12 left-1/2" />
        <FloatingCircle delay={2.5} size="w-12 h-12" position="top-56 right-1/4" />
        <FloatingCircle delay={4.5} size="w-20 h-20" position="bottom-24 left-1/3" />
        <FloatingCircle delay={6.5} size="w-14 h-14" position="bottom-48 right-1/3" />

        {/* Gentle floating dots */}
        <motion.div
          animate={{
            y: [0, -20, 10, -15, 0],
            x: [0, 15, -10, 20, 0],
            opacity: [0.2, 0.6, 0.4, 0.8, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-emerald-400 rounded-full opacity-30"
        />

        <motion.div
          animate={{
            y: [0, 25, -15, 30, 0],
            x: [0, -20, 15, -25, 0],
            opacity: [0.3, 0.7, 0.5, 0.9, 0.3],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-2/3 right-1/3 w-3 h-3 bg-green-400 rounded-full opacity-40"
        />

        <motion.div
          animate={{
            y: [0, -30, 20, -25, 0],
            x: [0, 25, -15, 30, 0],
            opacity: [0.25, 0.65, 0.45, 0.85, 0.25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/3 left-2/3 w-5 h-5 bg-teal-400 rounded-full opacity-35"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-black mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of satisfied creators
          </p>
        </motion.div>

        {/* Horizontally rotating testimonials */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              x: [0, -2400], // Adjusted for margin spacing (320px + 24px margin) * 7 = 2408px
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
            className="flex gap-6 w-max mb-8" // Added mb-8 for bottom margin
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                initial={{ y: 50, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: (index % 7) * 0.1 }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                  scale: 1.02
                }}
                className="bg-white p-6 rounded-xl shadow-lg min-w-[320px] max-w-[320px] flex-shrink-0 cursor-pointer group mb-6" // Added mb-6 margin
              >
                {/* Rating stars */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={inView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ 
                        duration: 0.4, 
                        delay: (index % 7) * 0.1 + i * 0.05,
                        type: "spring",
                        stiffness: 200 
                      }}
                    >
                      <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                    </motion.div>
                  ))}
                </div>
                
                {/* Testimonial content */}
                <motion.p 
                  className="text-gray-600 mb-6 italic leading-relaxed"
                  whileHover={{ color: '#374151' }}
                  transition={{ duration: 0.2 }}
                >
                  "{testimonial.content}"
                </motion.p>
                
                {/* User info */}
                <div className="flex items-center">
                  <motion.div
                    whileHover={{ 
                      scale: 1.15,
                      boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)'
                    }}
                    transition={{ duration: 0.2 }}
                    className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold mr-4 shadow-lg"
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div>
                    <motion.h4 
                      className="font-semibold text-black"
                      whileHover={{ color: '#059669' }}
                      transition={{ duration: 0.2 }}
                    >
                      {testimonial.name}
                    </motion.h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                {/* Decorative element */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-b-xl"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Static testimonials for mobile */}
        <div className="md:hidden mt-12 space-y-6"> {/* Changed to space-y-6 for consistent margin */}
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="bg-white p-6 rounded-xl shadow-lg mb-6" // Added mb-6 margin
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.2 + i * 0.1 }}
                  >
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                  </motion.div>
                ))}
              </div>
              
              <p className="text-gray-600 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold mr-4"
                >
                  {testimonial.avatar}
                </motion.div>
                <div>
                  <h4 className="font-semibold text-black">{testimonial.name}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fade out edges for carousel effect */}
        <div className="hidden md:block absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10"></div>
        <div className="hidden md:block absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
};

export default Testimonials;
