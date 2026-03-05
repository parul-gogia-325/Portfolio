import React, { useState } from 'react';
import { Mail, Linkedin, Code, ExternalLink, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const mailtoLink = `mailto:Parulgogia4550@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        )}`;
        setTimeout(() => {
            window.open(mailtoLink);
            setIsSubmitting(false);
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
        }, 1000);
    };

    const socialLinks = [
        { name: 'Email', icon: <Mail className="w-4 h-4" />, href: 'mailto:Parulgogia4550@gmail.com' },
        { name: 'LinkedIn', icon: <Linkedin className="w-4 h-4" />, href: 'https://linkedin.com' },
        { name: 'LeetCode', icon: <Code className="w-4 h-4" />, href: 'https://leetcode.com' },
        { name: 'GeeksForGeeks', icon: <ExternalLink className="w-4 h-4" />, href: 'https://auth.geeksforgeeks.org' },
    ];

    return (
        <>
            <style>{`
        @keyframes shine {
          100% { left: 125%; }
        }
        .contact-shine:hover .contact-shine-bar {
          animation: shine 0.75s;
        }
        .contact-input {
          width: 100%;
          background: #fcfaf7;
          border: 1px solid #e2ddd3;
          border-radius: 12px;
          padding: 14px 18px;
          color: #2d2b27;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
          resize: none;
        }
        .contact-input::placeholder { color: #b0aaa0; }
        .contact-input:focus {
          border-color: #ab9066;
          box-shadow: 0 0 0 3px rgba(171,144,102,0.12);
        }
      `}</style>

            <section id="contact" style={{ backgroundColor: '#f5f1ea', padding: '6rem 0' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem 0 5rem' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '5rem', alignItems: 'center' }}>

                        {/* ── Left: Copy + Social Pills ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <span style={{ color: '#8c704a', fontFamily: 'monospace', letterSpacing: '0.2em', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 600 }}>
                                    Get In Touch
                                </span>
                                <h2 className="section-title" style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}>
                                    Let's Work<br />
                                    <span style={{ color: '#ab9066' }}>Together</span>
                                </h2>
                                <div className="section-title-underline" />
                                <p style={{ color: '#5c5852', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '420px', marginTop: '0.5rem' }}>
                                    Have a project in mind, a question, or just want to say hi?
                                    I'd love to hear from you. Drop a message and I'll get back to you soon!
                                </p>
                            </div>

                            {/* Social pills */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                {socialLinks.map((link) => (
                                    <a key={link.name} href={link.href} target="_blank" rel="noreferrer"
                                        className="group"
                                        style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid #e2ddd3', textDecoration: 'none', transition: 'all 0.25s', fontSize: '0.88rem', fontWeight: 500, color: '#2d2b27', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
                                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#ab9066'; e.currentTarget.style.backgroundColor = '#fff'; }}
                                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2ddd3'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)'; }}
                                    >
                                        <span style={{ color: '#8c704a' }}>{link.icon}</span>
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* ── Right: Form Card ── */}
                        <div style={{ position: 'relative' }}>
                            {/* Warm glow */}
                            <div style={{ position: 'absolute', inset: '-4px', background: 'rgba(171,144,102,0.08)', borderRadius: '40px', filter: 'blur(24px)', pointerEvents: 'none' }} />

                            <div style={{ position: 'relative', backgroundColor: '#fffcf9', border: '1px solid #e2ddd3', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.07)' }}>
                                {isSubmitted ? (
                                    <div style={{ padding: '60px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                        <div style={{ backgroundColor: '#f5f1ea', padding: '18px', borderRadius: '50%' }}>
                                            <CheckCircle2 style={{ width: '48px', height: '48px', color: '#8c704a' }} />
                                        </div>
                                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#2d2b27', margin: 0 }}>Message Received!</h3>
                                        <p style={{ color: '#5c5852', margin: 0 }}>Thanks for reaching out. I'll get back to you shortly.</p>
                                        <button onClick={() => setIsSubmitted(false)}
                                            style={{ marginTop: '8px', color: '#ab9066', background: 'none', border: 'none', fontWeight: 500, fontSize: '0.9rem', cursor: 'pointer' }}>
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        {/* Name */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8c704a' }}>Name</label>
                                            <input required type="text" placeholder="Your full name" className="contact-input"
                                                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>

                                        {/* Email */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8c704a' }}>Email</label>
                                            <input required type="email" placeholder="your@email.com" className="contact-input"
                                                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                        </div>

                                        {/* Message */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#8c704a' }}>Message</label>
                                            <textarea required rows={4} placeholder="Tell me about your project or say hello..." className="contact-input"
                                                value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} />
                                        </div>

                                        {/* Submit */}
                                        <button type="submit" disabled={isSubmitting} className="contact-shine"
                                            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: isSubmitting ? '#a88860' : '#8c704a', color: '#fff', border: 'none', borderRadius: '12px', padding: '15px 28px', fontSize: '0.95rem', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background-color 0.25s', overflow: 'hidden', fontFamily: 'DM Sans, sans-serif' }}
                                            onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = '#7a6140'; }}
                                            onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#8c704a'; }}>
                                            {isSubmitting ? (
                                                <div style={{ width: '22px', height: '22px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                                            ) : (
                                                <>
                                                    <span>Send Message</span>
                                                    <Send style={{ width: '16px', height: '16px', transition: 'transform 0.2s' }} />
                                                </>
                                            )}
                                            {/* Shine bar */}
                                            <div className="contact-shine-bar" style={{ position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12))', transform: 'skewX(-12deg)', pointerEvents: 'none' }} />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
    );
};

export default Contact;
