import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';  // Add Link for navigation
import '../styles/Dashboard.css';

function Dashboard() {
    const value = 1729;

    useEffect(() => {
        localStorage.setItem('mee', value);
    }, [value]);

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">Social Media Analytics Dashboard</h1>
                    <p className="hero-subtitle">
                        Unlock the power of your social media presence with comprehensive analytics,
                        real-time insights, and actionable data across all platforms.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/" className="cta-primary">Get Started</Link>
                        <Link to="/" className="cta-secondary">View Demo</Link>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-container">
                    <div className="stat-card">
                        <div className="stat-number">50K+</div>
                        <div className="stat-label">Active Users</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">2.4M</div>
                        <div className="stat-label">Data Points Analyzed</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">99.9%</div>
                        <div className="stat-label">Uptime Guarantee</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">15+</div>
                        <div className="stat-label">Platforms Supported</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>Dashboard Highlights</h2>
                <div className="features">
                    <div className="feature">
                        <h3>Comprehensive Analytics</h3>
                        <p>Track follower growth, engagement rates, and post performance across all platforms with detailed metrics and trend analysis.</p>
                    </div>
                    <div className="feature">
                        <h3>Real-Time Data</h3>
                        <p>Get up-to-the-minute updates on your social media statistics with live data streaming and instant notifications.</p>
                    </div>
                    <div className="feature">
                        <h3>Customizable Reports</h3>
                        <p>Create and share custom reports with your team for actionable insights. Export in multiple formats including PDF, Excel, and PowerPoint.</p>
                    </div>
                    <div className="feature">
                        <h3>Data Visualization</h3>
                        <p>Use visually intuitive charts, graphs, and interactive dashboards for easy data interpretation and trend identification.</p>
                    </div>
                    <div className="feature">
                        <h3>Platform-Specific Metrics</h3>
                        <p>Each platform has unique metrics such as video views, subscriber count, date joined, followers count, following count, and engagement rates.</p>
                    </div>
                    <div className="feature">
                        <h3>Advanced AI Insights</h3>
                        <p>Leverage machine learning algorithms to predict trends, identify optimal posting times, and recommend content strategies for maximum reach.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <h2>What Our Users Say</h2>
                <div className="testimonials">
                    <div className="testimonial">
                        <p className="testimonial-text">
                            "This dashboard has completely transformed how we manage our social media strategy. The insights are invaluable!"
                        </p>
                        <div className="testimonial-author">- Sarah Johnson, Marketing Director</div>
                    </div>
                    <div className="testimonial">
                        <p className="testimonial-text">
                            "The real-time analytics and custom reporting features have saved us countless hours. Highly recommended!"
                        </p>
                        <div className="testimonial-author">- Mike Chen, Social Media Manager</div>
                    </div>
                    <div className="testimonial">
                        <p className="testimonial-text">
                            "Finally, a tool that brings all our social media data together in one beautiful, easy-to-use interface."
                        </p>
                        <div className="testimonial-author">- Emma Davis, Content Creator</div>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="pricing-section">
                <h2>Choose Your Plan</h2>
                <div className="pricing-cards">
                    <div className="pricing-card">
                        <h3>Starter</h3>
                        <div className="pricing-price">$1<span style={{ fontSize: '1rem', color: '#666' }}>/month</span></div>
                        <ul className="pricing-features">
                            <li>Up to 5 social accounts</li>
                            <li>Basic analytics</li>
                            <li>Monthly reports</li>
                            <li>Email support</li>
                        </ul>
                        <Link to="/" className="cta-primary">Get Started</Link>
                    </div>
                    <div className="pricing-card featured">
                        <h3>Professional</h3>
                        <div className="pricing-price">$12<span style={{ fontSize: '1rem', color: '#666' }}>/month</span></div>
                        <ul className="pricing-features">
                            <li>Up to 25 social accounts</li>
                            <li>Advanced analytics & AI insights</li>
                            <li>Real-time reporting</li>
                            <li>Custom dashboards</li>
                            <li>Priority support</li>
                        </ul>
                        <Link to="/" className="cta-primary">Most Popular</Link>
                    </div>
                    <div className="pricing-card">
                        <h3>Enterprise</h3>
                        <div className="pricing-price">$25<span style={{ fontSize: '1rem', color: '#666' }}>/month</span></div>
                        <ul className="pricing-features">
                            <li>Unlimited social accounts</li>
                            <li>White-label reporting</li>
                            <li>API access</li>
                            <li>Dedicated account manager</li>
                            <li>24/7 phone support</li>
                        </ul>
                        <Link to="/" className="cta-primary">Contact Sales</Link>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Product</h4>
                        <Link to="">Features</Link>
                        <Link to="">Pricing</Link>
                        <Link to="">Integrations</Link>
                        <Link to="">API</Link>
                    </div>
                    <div className="footer-section">
                        <h4>Company</h4>
                        <Link to="">About Us</Link>
                        <Link to="">Careers</Link>
                        <Link to="">Blog</Link>
                        <Link to="">Press</Link>
                    </div>
                    <div className="footer-section">
                        <h4>Support</h4>
                        <Link to="">Help Center</Link>
                        <Link to="">Contact</Link>
                        <Link to="">System Status</Link>
                        <Link to="">Community</Link>
                    </div>
                    <div className="footer-section">
                        <h4>Legal</h4>
                        <Link to="">Privacy Policy</Link>
                        <Link to="">Terms of Service</Link>
                        <Link to="">Security</Link>
                        <Link to="">Compliance</Link>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 GSMAD. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Dashboard;