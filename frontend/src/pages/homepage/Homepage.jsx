import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Homepage.css'; // Import the CSS file for styles

import Header from '../../components/Homepage/Header';
import Hero from '../../components/Homepage/Hero';
import Features from '../../components/Homepage/Features';
import Gallery from '../../components/Homepage/Gallery';
import Testimonials from '../../components/Homepage/Testimonials';
import CTA from '../../components/Homepage/CTA';
import Footer from '../../components/Homepage/Footer';

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
