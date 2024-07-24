import "../styles/Footer.css"
import {Link } from "react-router-dom";

function Footer() {
    return (
      <div className="footerSection">
        <div className="quickLinks">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
        <Link to="/articles">All Articles</Link>
        <Link to="/about">About Us</Link>
        <Link to="/">Admin Panel</Link>
        </div>
        <div className="legalLinks">
          <h4>Legal Links</h4>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
        </div>
      </div>
    );
}

export  default Footer;