import React from 'react';
import { motion } from 'framer-motion';
import './Achievements.css';

const stats = [
    { value: '200+', label: 'LeetCode Problems' },
    { value: '5+', label: 'Certifications' },
    { value: '10+', label: 'Projects Completed' },
    { value: '1+', label: 'Years Experience' },
];

const achievements = [
    {
        icon: '🏆',
        title: 'Microsoft Certified',
        description: 'Certified in Microsoft Dynamics 365 and Power Platform, demonstrating expertise in enterprise CRM solutions.',
    },
    {
        icon: '🤖',
        title: 'Copilot Studio Expert',
        description: 'Built AI-powered chatbots and automation workflows using Microsoft Copilot Studio at Cognizant.',
    },
    {
        icon: '🌿',
        title: 'GeeksForGeeks Contributor',
        description: 'Active problem-solver on GeeksForGeeks with consistent contributions to the coding community.',
    },
    {
        icon: '💻',
        title: 'LeetCode Solver',
        description: 'Solved 200+ problems on LeetCode across arrays, trees, dynamic programming, and graph algorithms.',
    },
    {
        icon: '🚀',
        title: 'Enterprise IVR Developer',
        description: 'Developed and deployed enterprise-grade IVR applications for large-scale business communication systems.',
    },
    {
        icon: '🎓',
        title: 'Computer Science Graduate',
        description: 'Graduated with a degree in Computer Science, building a strong foundation in data structures, algorithms, and software engineering.',
    },
];

const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.97 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { delay: 0.2 + i * 0.1, duration: 0.6, ease: 'easeOut' },
    }),
};

const Achievements = () => {
    return (
        <section className="achievements-section" id="achievements">
            <motion.div
                className="section-container achievements-wrapper"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
            >
                <p className="achievements-eyebrow">Milestones</p>
                <h2 className="section-title">Achievements</h2>
                <div className="section-title-underline" />

                {/* Stats Row */}
                <div className="achievements-stats">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="stat-card"
                            variants={cardVariants}
                            custom={i}
                        >
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Achievement Cards Grid */}
                <div className="achievements-grid">
                    {achievements.map((item, i) => (
                        <motion.div
                            key={item.title}
                            className="achievement-card glass-card"
                            variants={cardVariants}
                            custom={i + stats.length}
                        >
                            <div className="achievement-icon">{item.icon}</div>
                            <h3 className="achievement-title">{item.title}</h3>
                            <p className="achievement-desc">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Achievements;
