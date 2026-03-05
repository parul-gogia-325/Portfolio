import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const Projects = () => {
  const projectsData = [
    {
      id: 1,
      title: 'Kissan Mitra',
      description: 'Built an IoT-enabled agriculture solution integrating soil monitoring sensors to assist farmers in precision farming.',
      imageClass: 'project-img-1',
      tags: ['IoT', 'Sensors', 'PH Monitoring'],
      period: 'Aug 2023',
      link: '#',
    },
    {
      id: 2,
      title: 'Medical Insurance Fraud Detection',
      description: 'Designed a system to identify fraudulent medical claims using data-driven pattern analysis. Published as a research paper.',
      imageClass: 'project-img-2',
      tags: ['Data Analysis', 'Pattern Recognition', 'Research'],
      period: 'Feb 2022',
      link: '#',
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="projects-section" id="work">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">My Work</h2>
          <div className="section-title-underline"></div>
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              whileHover={{ translateY: -5 }}
            >
              <div className={`project-image-placeholder ${project.imageClass}`}>
                <div className="project-overlay">
                  <motion.a
                    href={project.link}
                    className="btn primary-btn view-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                  </motion.a>
                </div>
              </div>
              <div className="project-info">
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  <span className="project-period">{project.period}</span>
                </div>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
