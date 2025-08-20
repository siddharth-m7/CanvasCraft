// components/Gallery.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import abstractArt from '../../assets/images/gallery/abstract-art.jpg';
import portrait from '../../assets/images/gallery/portrait.jpeg';
import logoDesign from '../../assets/images/gallery/logo-design.webp';
import colorGrading from '../../assets/images/gallery/Color-Grading.avif';
import landscape from '../../assets/images/gallery/landscape.jpg';
import socialmedia from '../../assets/images/gallery/social-media.png';

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const galleryItems = [
    { id: 1, category: 'AI Generated', title: 'Abstract Art', image: abstractArt, alt: 'AI-generated abstract artwork' },
    { id: 2, category: 'Photo Edit', title: 'Portrait Enhancement', image: portrait, alt: 'Enhanced portrait photo' },
    { id: 3, category: 'AI Generated', title: 'Landscape', image: landscape, alt: 'AI-generated landscape' },
    { id: 4, category: 'Design', title: 'Logo Creation', image: logoDesign, alt: 'Custom logo design' },
    { id: 5, category: 'Photo Edit', title: 'Color Grading', image: colorGrading, alt: 'Color graded photo' },
    { id: 6, category: 'Design', title: 'Social Media Post', image: socialmedia, alt: 'Social media post design' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 50, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Enhanced rain drop component
  const RainDrop = ({ delay = 0, position = 'left-10', size = 'w-0.5 h-8', opacity = '0.6' }) => (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{
        opacity: [0, opacity, opacity * 1.5, opacity * 0.8, 0],
        y: [-30, 150, 300, 450, 600],
      }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Infinity,
        ease: "easeIn"
      }}
      className={`absolute ${position} ${size} bg-gradient-to-b from-emerald-400 to-transparent rounded-full`}
    />
  );

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden" id="gallery">
      {/* Enhanced Rain Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left side heavy rain */}
        <RainDrop delay={0} position="left-2 top-0" size="w-0.5 h-12" opacity="0.8" />
        <RainDrop delay={0.1} position="left-6 top-0" size="w-1 h-8" opacity="0.6" />
        <RainDrop delay={0.2} position="left-10 top-0" size="w-0.5 h-14" opacity="0.9" />
        <RainDrop delay={0.3} position="left-14 top-0" size="w-0.5 h-10" opacity="0.7" />
        <RainDrop delay={0.4} position="left-18 top-0" size="w-1 h-9" opacity="0.5" />
        <RainDrop delay={0.5} position="left-22 top-0" size="w-0.5 h-11" opacity="0.8" />
        <RainDrop delay={0.6} position="left-26 top-0" size="w-0.5 h-13" opacity="0.6" />
        <RainDrop delay={0.7} position="left-30 top-0" size="w-1 h-7" opacity="0.7" />
        <RainDrop delay={0.8} position="left-34 top-0" size="w-0.5 h-10" opacity="0.9" />
        <RainDrop delay={0.9} position="left-38 top-0" size="w-0.5 h-12" opacity="0.5" />
        <RainDrop delay={1.0} position="left-42 top-0" size="w-1 h-8" opacity="0.8" />
        <RainDrop delay={1.1} position="left-46 top-0" size="w-0.5 h-11" opacity="0.7" />
        <RainDrop delay={1.2} position="left-50 top-0" size="w-0.5 h-9" opacity="0.6" />

        {/* Right side heavy rain */}
        <RainDrop delay={0.05} position="right-2 top-0" size="w-0.5 h-13" opacity="0.7" />
        <RainDrop delay={0.15} position="right-6 top-0" size="w-1 h-10" opacity="0.6" />
        <RainDrop delay={0.25} position="right-10 top-0" size="w-0.5 h-12" opacity="0.8" />
        <RainDrop delay={0.35} position="right-14 top-0" size="w-0.5 h-8" opacity="0.9" />
        <RainDrop delay={0.45} position="right-18 top-0" size="w-1 h-11" opacity="0.5" />
        <RainDrop delay={0.55} position="right-22 top-0" size="w-0.5 h-9" opacity="0.7" />
        <RainDrop delay={0.65} position="right-26 top-0" size="w-0.5 h-14" opacity="0.6" />
        <RainDrop delay={0.75} position="right-30 top-0" size="w-1 h-10" opacity="0.8" />
        <RainDrop delay={0.85} position="right-34 top-0" size="w-0.5 h-12" opacity="0.7" />
        <RainDrop delay={0.95} position="right-38 top-0" size="w-0.5 h-8" opacity="0.9" />
        <RainDrop delay={1.05} position="right-42 top-0" size="w-1 h-9" opacity="0.5" />
        <RainDrop delay={1.15} position="right-46 top-0" size="w-0.5 h-11" opacity="0.8" />
        <RainDrop delay={1.25} position="right-50 top-0" size="w-0.5 h-10" opacity="0.6" />

        {/* Center area rain */}
        <RainDrop delay={0.12} position="left-1/4 top-0" size="w-0.5 h-10" opacity="0.7" />
        <RainDrop delay={0.24} position="left-1/3 top-0" size="w-1 h-12" opacity="0.6" />
        <RainDrop delay={0.36} position="left-2/5 top-0" size="w-0.5 h-8" opacity="0.8" />
        <RainDrop delay={0.48} position="left-1/2 top-0" size="w-0.5 h-11" opacity="0.9" />
        <RainDrop delay={0.60} position="left-3/5 top-0" size="w-1 h-9" opacity="0.5" />
        <RainDrop delay={0.72} position="left-2/3 top-0" size="w-0.5 h-10" opacity="0.7" />
        <RainDrop delay={0.84} position="left-3/4 top-0" size="w-0.5 h-12" opacity="0.6" />

        {/* Additional scattered rain for density */}
        <RainDrop delay={1.3} position="left-16 top-0" size="w-1 h-7" opacity="0.7" />
        <RainDrop delay={1.4} position="left-36 top-0" size="w-0.5 h-9" opacity="0.8" />
        <RainDrop delay={1.5} position="left-56 top-0" size="w-0.5 h-11" opacity="0.6" />
        <RainDrop delay={1.6} position="right-16 top-0" size="w-1 h-8" opacity="0.9" />
        <RainDrop delay={1.7} position="right-36 top-0" size="w-0.5 h-10" opacity="0.5" />
        <RainDrop delay={1.8} position="right-56 top-0" size="w-0.5 h-12" opacity="0.7" />

        {/* Light mist effect */}
        <RainDrop delay={2.0} position="left-8 top-0" size="w-0.5 h-6" opacity="0.3" />
        <RainDrop delay={2.1} position="left-24 top-0" size="w-0.5 h-5" opacity="0.4" />
        <RainDrop delay={2.2} position="left-40 top-0" size="w-0.5 h-7" opacity="0.3" />
        <RainDrop delay={2.3} position="right-8 top-0" size="w-0.5 h-6" opacity="0.4" />
        <RainDrop delay={2.4} position="right-24 top-0" size="w-0.5 h-5" opacity="0.3" />
        <RainDrop delay={2.5} position="right-40 top-0" size="w-0.5 h-7" opacity="0.4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-black mb-4">
            Gallery Showcase
          </h2>
          <p className="text-xl text-gray-600">
            See what's possible with CanvasCraft
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {galleryItems.map((galleryItem, index) => (
            <motion.div
              key={galleryItem.id}
              variants={item}
              whileHover={{ 
                scale: 1.02,
                rotateY: 3,
                boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
              }}
              className="group relative overflow-hidden rounded-xl bg-gray-100 h-64 cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full rounded-xl overflow-hidden relative"
              >
                {/* Image display */}
                {galleryItem.image ? (
                  <img 
                    src={galleryItem.image} 
                    alt={galleryItem.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      console.error('Failed to load image:', galleryItem.image);
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Fallback placeholder */}
                <div 
                  className={`image-placeholder w-full h-full rounded-xl ${galleryItem.image ? 'hidden' : 'flex'}`}
                  style={galleryItem.image ? { display: 'none' } : {}}
                >
                  <div className="text-center">
                    <div className="text-sm font-medium text-green-600 mb-2">
                      {galleryItem.category}
                    </div>
                    <div className="text-lg font-semibold text-gray-700">
                      {galleryItem.title}
                    </div>
                  </div>
                </div>

                {/* Hover overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="text-sm font-medium text-emerald-400 mb-1">
                    {galleryItem.category}
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {galleryItem.title}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Gallery;
