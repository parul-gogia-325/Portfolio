import React from 'react';
import { motion } from 'framer-motion';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: 'Programmer Analyst Trainee',
      company: 'Cognizant Technology Solutions',
      period: 'Aug 2025 – Present',
      bullets: [
        'Worked on enterprise-level IVR applications to enhance customer interaction and call flow automation.',
        'Developed and customised business solutions using Microsoft Dynamics 365.',
        'Designed intelligent conversational workflows using Microsoft Copilot Studio.',
        'Created and managed AI-powered agents to automate support processes and improve operational efficiency.',
        'Collaborated with cross-functional teams to analyse requirements and deliver reliable, scalable solutions.',
        'Gained hands-on experience with Microsoft enterprise and cloud-based ecosystems.',
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="experience-section" id="experience">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">My Experience</h2>
          <div className="section-title-underline"></div>
        </motion.div>

        <motion.div 
          className="timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experiences.map((exp) => (
            <motion.div key={exp.id} className="timeline-item" variants={itemVariants}>
              <div className="timeline-dot"></div>
              <motion.div 
                className="timeline-content"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="timeline-header">
                  <h3>{exp.role}</h3>
                  <span className="timeline-period">{exp.period}</span>
                </div>
                <h4 className="timeline-company">{exp.company}</h4>
                <ul className="timeline-bullets">
                  {exp.bullets.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
