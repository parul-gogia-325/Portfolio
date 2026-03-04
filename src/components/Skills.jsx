import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      label: 'Languages',
      skills: ['C', 'C++', 'Python'],
    },
    {
      label: 'Core Concepts',
      skills: ['Data Structures', 'Algorithms'],
    },
    {
      label: 'Web Development',
      skills: ['HTML', 'CSS', 'JavaScript'],
    },
    {
      label: 'Enterprise Tools',
      skills: ['Microsoft Dynamics 365', 'Copilot Studio', 'IVR Systems'],
    },
    {
      label: 'Tools & Platforms',
      skills: ['Git', 'GitHub', 'VS Code'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="skills-section" id="skills">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-title-underline"></div>
        </motion.div>
        
        <motion.div 
          className="skills-container"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((cat, i) => (
            <motion.div key={i} className="skill-category-card glass-card" variants={cardVariants}>
              <h3 className="skill-category-label">{cat.label}</h3>
              <div className="skills-grid">
                {cat.skills.map((skill, j) => (
                  <motion.div 
                    key={j} 
                    className="skill-badge"
                    whileHover={{ scale: 1.05, backgroundColor: "var(--accent)", color: "var(--bg-card)" }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
