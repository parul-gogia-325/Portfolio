import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Compose a mailto link with the form data
        const mailtoLink = `mailto:Parulgogia4550@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        window.open(mailtoLink);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: '', email: '', message: '' });
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
            opacity: 1, y: 0,
            transition: { delay: 0.2 + i * 0.15, duration: 0.6, ease: 'easeOut' },
        }),
    };

    const socials = [
        { label: '📧 Email', href: 'mailto:Parulgogia4550@gmail.com' },
        { label: '🔗 LinkedIn', href: 'https://linkedin.com' },
        { label: '💻 LeetCode', href: 'https://leetcode.com' },
        { label: '🌿 GeeksForGeeks', href: 'https://auth.geeksforgeeks.org' },
    ];

    return (
        <section className="contact-section" id="contact">
            <motion.div
                className="contact-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
            >
                {/* Left Info Column */}
                <div className="contact-info">
                    <motion.p className="contact-eyebrow" variants={itemVariants} custom={0}>
                        Get In Touch
                    </motion.p>
                    <motion.h2 className="contact-heading" variants={itemVariants} custom={1}>
                        Let's Work<br /><span className="gradient-text">Together</span>
                    </motion.h2>
                    <motion.p className="contact-subtext" variants={itemVariants} custom={2}>
                        Have a project in mind, a question, or just want to say hi?
                        I'd love to hear from you. Drop a message and I'll get back to you soon!
                    </motion.p>

                    <motion.div className="contact-socials" variants={itemVariants} custom={3}>
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                className="contact-social-link"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {s.label}
                            </a>
                        ))}
                    </motion.div>
                </div>

                {/* Right Form Column */}
                <motion.div className="contact-form-card" variants={itemVariants} custom={2}>
                    {submitted ? (
                        <div className="contact-success">
                            <span className="success-icon">✅</span>
                            <h3>Message Sent!</h3>
                            <p>Thanks for reaching out. I'll get back to you shortly.</p>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your full name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    placeholder="Tell me about your project or say hello..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="contact-submit-btn">
                                Send Message →
                            </button>
                        </form>
                    )}
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Contact;
