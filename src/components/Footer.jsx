import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            Parul<span>.</span>
          </div>
          <p className="footer-tagline">
            Building scalable solutions with a focus on enterprise integration and AI.
          </p>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Parul Gogia. All rights reserved.
          </p>
          <div className="footer-socials">
            <a href="https://linkedin.com">LinkedIn</a>
            <a href="https://github.com">GitHub</a>
            <a href="mailto:Parulgogia4550@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
