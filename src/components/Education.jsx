import React from 'react';
import { motion } from 'framer-motion';
import './Education.css';

const Education = () => {
  const education = [
    {
      degree: 'Bachelor of Engineering (Computer Science)',
      institution: 'Chandigarh University',
      period: '2021 – 2025',
      detail: 'CGPA: 8.23 (Till 4th Semester)',
    },
    {
      degree: 'Higher Secondary Education (CBSE)',
      institution: 'K.L. Arya D.A.V Public School',
      period: '2019 – 2021',
      detail: 'Percentage: 90.1%',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="education-section" id="education">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Education</h2>
          <div className="section-title-underline"></div>
        </motion.div>
        
        <motion.div 
          className="education-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {education.map((edu, i) => (
            <motion.div 
              key={i} 
              className="edu-card glass-card"
              variants={cardVariants}
              whileHover={{ scale: 1.03, translateY: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="edu-header">
                <span className="edu-period">{edu.period}</span>
                <h3 className="edu-degree">{edu.degree}</h3>
              </div>
              <div className="edu-institution">{edu.institution}</div>
              <div className="edu-detail">{edu.detail}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
