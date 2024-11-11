import React from 'react';
import { Link } from 'react-router-dom';  // Add Link for navigation
import '../styles/Dashboard.css';

function Dashboard() {
    return (
        <div className="landing-page">
           

            {/* Features Section */}
            <section className="features-section">
                <h2>Dashboard Highlights</h2>
                <div className="features">
                    <div className="feature">
                        <h3>Comprehensive Analytics</h3>
                        <p>Track follower growth, engagement rates, and post performance across all platforms.</p>
                    </div>
                    <div className="feature">
                        <h3>Real-Time Data</h3>
                        <p>Get up-to-the-minute updates on your social media statistics.</p>
                    </div>
                    <div className="feature">
                        <h3>Customizable Reports</h3>
                        <p>Create and share custom reports with your team for actionable insights.</p>
                    </div>
                    <div className="feature">
                        <h3>Data Visualization</h3>
                        <p>Use visually intuitive charts, graphs for data interpretation.</p>
                    </div>
                    <div className="feature">
                        <h3>Platform-Specific Metrics</h3>
                        <p>Each platform has unique metrics such as video views, subscriber count, Date joined, Followers count, Following count</p>
                    </div>
                    <div className="feature">
                        <h3>Comprehensive Analytics</h3>
                        <p>Track follower growth, engagement rates, and post performance across all platforms.</p>
                    </div>
                </div>
            </section>          

            {/* Footer Section */}
            <footer className="footer">
                <p>&copy; 2024 Social Media Analytics Dashboard</p>
            </footer>
        </div>
    );
}

export default Dashboard;
