import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <div className="about-container">
      <h1>About Our Social Media Analytics Dashboard</h1>
      <p>
        Our Social Media Analytics Dashboard is designed to provide real-time insights and data analysis
        from various social media platforms, helping you track your performance, audience engagement, 
        and growth across YouTube and Twitter.
      </p>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          We aim to empower users with data-driven insights to make better decisions and understand 
          their social media reach and engagement. Our dashboard is built to be user-friendly, 
          informative, and tailored to meet the needs of businesses and individuals alike.
        </p>
      </section>

      <section className="about-section">
        <h2>Features</h2>
        <ul>
          <li>Real-time analytics from platforms like YouTube and Twitter</li>
          <li>Customizable reports and visualizations</li>
          <li>Detailed engagement metrics</li>
          <li>Audience demographics and reach analysis</li>
        </ul>
      </section>

     
      <section className="about-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? Reach out to us at <a href="mailto:giridharans1729@gmail.com">giridharans1729@gmail.com</a>.
        </p>
      </section>
    </div>
  );
}

export default About;
