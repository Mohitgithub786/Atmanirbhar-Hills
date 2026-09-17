// Footer.jsx
import React from "react";
import "./footer.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-modern">
      {/* Top Glowing Gradient Accent Bar */}
      <div className="footer-accent-bar"></div>

      <div className="footer-container">
        {/* Brand & Tagline */}
        <div className="footer-col brand-col">
          <h2 className="footer-brand">
            Atmanirbhar <span className="brand-highlight">Hills</span>
          </h2>
          <p className="footer-tagline">
            Empowering mountain artisans & local micro-businesses through direct digital commerce.
          </p>
          <div className="vocal-local-badge">
            🇮🇳 Vocal for Local Initiative
          </div>
          <div className="social-links-modern">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaXTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="footer-col">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-nav-list">
            <li><Link to="/">Home Marketplace</Link></li>
            <li><Link to="/category/Traditional%20Craftspeople">Handicrafts</Link></li>
            <li><Link to="/category/Agricultural%20Producers">Organic Spices</Link></li>
            <li><Link to="/liked-products">My Favourites</Link></li>
            <li><Link to="/add-product">Sell Local Products</Link></li>
          </ul>
        </div>

        {/* Categories / Specialties */}
        <div className="footer-col">
          <h3 className="footer-heading">Hill Specialties</h3>
          <ul className="footer-nav-list">
            <li><span className="bullet">✦</span> Kullu Handloom Woolens</li>
            <li><span className="bullet">✦</span> Organic Kangra & Darjeeling Teas</li>
            <li><span className="bullet">✦</span> Bamboo & Pine Cone Craftsmanship</li>
            <li><span className="bullet">✦</span> Himalayan Pure Honey & Spices</li>
          </ul>
        </div>

        {/* Contact Info & Newsletter */}
        <div className="footer-col contact-col">
          <h3 className="footer-heading">Get in Touch</h3>
          <div className="contact-item">
            <FaMapMarkerAlt className="c-icon" />
            <span>Himachal Pradesh & Uttarakhand, India</span>
          </div>
          <div className="contact-item">
            <FaEnvelope className="c-icon" />
            <span>support@atmanirbharhills.com</span>
          </div>
          <div className="contact-item">
            <FaPhoneAlt className="c-icon" />
            <span>+91 1800-LOCAL-HILLS</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-modern">
        <div className="bottom-inner">
          <p>&copy; {new Date().getFullYear()} Atmanirbhar Hills. All Rights Reserved.</p>
          <p className="made-in-india">Crafted with ❤️ for Local Indian Artisans</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
