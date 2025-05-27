
import React from 'react';
import './Footer.css'; // You can create a CSS file for styling

function Footer() {
  return (
    <footer className="power-rangers-footer">
      <div className="footer-links">
        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/characters">Characters</a></li>
            <li><a href="/zords">Zords</a></li>
            <li><a href="/episodes">Episodes</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Community</h3>
          <ul>
            <li><a href="/forums">Forums</a></li>
            <li><a href="/fan-fiction">Fan Fiction</a></li>
            <li><a href="/fan-art">Fan Art</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Legal & Information</h3>
          <ul>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms-of-service">Terms of Service</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Connect</h3>
          <ul className="social-links">
            <li><a href="https://www.facebook.com/powerrangersofficial" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com/PowerRangers" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://www.instagram.com/powerrangers/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href="https://www.youtube.com/user/PowerRangersOfficial" target="_blank" rel="noopener noreferrer">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Power Rangers Website. All rights reserved. Power Rangers and all related logos, characters, names, and distinctive likenesses thereof are trademarks of SCG Power Rangers LLC.</p>
      </div>
    </footer>
  );
}

export default Footer;