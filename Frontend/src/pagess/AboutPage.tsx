import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/about/HeroSection';
import MissionSection from '../components/about/MissionSection';
import ServicesSection from '../components/about/ServicesSection';
import TestimonialsSection from '../components/about/TestimonialsSection';
import FaqSection from '../components/about/FaqSection';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50">
        <Navbar />
        
            {/* Main content of the About page */}
        <HeroSection />
        <MissionSection />
        <ServicesSection />
        <TestimonialsSection />
        <FaqSection />
      
      <Footer />
    </div>
  );
};

export default AboutPage;