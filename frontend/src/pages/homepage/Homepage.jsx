import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './homepage.css'; // Import the CSS file for styles

import Header from '../../components/homepage/Header';
import Hero from '../../components/homepage/Hero';
import Features from '../../components/homepage/Features';
import Gallery from '../../components/homepage/Gallery';
import Testimonials from '../../components/homepage/Testimonials';
import CTA from '../../components/homepage/CTA';
import Footer from '../../components/homepage/Footer';

function Homepage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  return (
    <div className="App bg-white">
      
      <Header />
      <Hero />
      <section id="features">
        <Features />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <CTA />
      
      <section id="about">
        <Footer />
      </section>

    </div>
  );
}

export default Homepage;
