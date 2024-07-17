import "../../../../frontend/blog-app/src/styles/Footer.css"
import {Link } from "react-router-dom";

function Footer() {
    return (
      <div className="footerSection">
        <div className="quickLinks">
          <h4>Blog Page</h4>
          <Link to="/">Home</Link>
        <Link to="/articles">All Articles</Link>
        <Link to="/">About Us</Link>
        <Link to="/">Contact Us</Link>
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