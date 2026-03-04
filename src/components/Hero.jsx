import React from 'react';
import { motion } from 'framer-motion';
import FlowerCanvas from './Flower';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content-left">
          <motion.p className="greeting" variants={itemVariants}>
            Hello, world! I am
          </motion.p>
          <motion.h1 className="name" variants={itemVariants}>
            Parul Gogia
          </motion.h1>
          <motion.h2 className="title" variants={itemVariants}>
            <span className="gradient-text">Programmer Analyst Trainee</span>
          </motion.h2>

          <motion.p className="description" variants={itemVariants}>
            Motivated and adaptable Computer Science graduate seeking a Software Developer role.
            Eager to leverage strong problem-solving skills, enterprise application exposure,
            and emerging technologies to contribute to scalable and innovative software solutions.
          </motion.p>

          <motion.div className="hero-actions" variants={itemVariants}>
            <a href="#work" className="btn primary-btn">View My Work</a>
            <a href="mailto:Parulgogia4550@gmail.com" className="btn secondary-btn">Contact Me</a>
          </motion.div>


        </div>
      </motion.div>

      <motion.div
        className="hero-animation-side"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1 }}
      >
        <div className="animation-container">
          <FlowerCanvas />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
