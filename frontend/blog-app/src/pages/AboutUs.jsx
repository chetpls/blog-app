import React from 'react';
import '../styles/AboutUs.css'

function AboutUs(){
    return (
        <div className="aboutUsContainer">
          <h1 className="aboutUsTitle">About Us</h1>
          
          <div className="aboutUsContent">
            <div className="aboutUsSection">
              <h2>Our Vision</h2>
              <p>
                Welcome to our cutting-edge AI-powered blog, where technology meets creativity. 
                We aim to provide insightful, engaging content generated by advanced AI algorithms, 
                complemented by carefully curated visuals from Google Images.
              </p>
            </div>
    
            <div className="aboutUsSection">
              <h2>Technology Stack</h2>
              <ul>
                <li><strong>Frontend:</strong> React</li>
                <li><strong>Backend:</strong> Express.js</li>
                <li><strong>Database:</strong> MongoDB</li>
                <li><strong>Content Generation:</strong> Claude.ai</li>
                <li><strong>Images:</strong> Curated from Google Images</li>
              </ul>
            </div>
    
            <div className="aboutUsSection">
              <h2>Design Inspiration</h2>
              <p>
                The blog site's design is inspired by the "AI Blog Website UI Template - Dark Theme" 
                created by Praha, available on Figma.
              </p>
            </div>
    
            <div className="aboutUsSection">
              <h2>Our Process</h2>
              <p>
                Each post on the blog is created by AI as sample data fro technology-related blog posts.
              </p>
            </div>
          </div>
        </div>
      );
};

export default AboutUs;