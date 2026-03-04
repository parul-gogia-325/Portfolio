import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      <motion.div 
        className="section-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="section-title">About Me</h2>
        <div className="section-title-underline"></div>
        
        <div className="about-content">
          <div className="about-text-card glass-card">
            <h3>Who I Am</h3>
            <p>
              Motivated and adaptable Computer Science graduate currently working as a 
              <strong> Programmer Analyst Trainee at Cognizant Technology Solutions</strong>. 
              I specialise in enterprise-level IVR applications, Microsoft Dynamics 365, 
              Copilot Studio, and AI-powered automation workflows.
            </p>
            <p>
              Eager to leverage strong problem-solving skills and emerging technologies to 
              contribute to scalable and innovative software solutions. I thrive in 
              cross-functional environments and love delivering reliable, impactful results.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
