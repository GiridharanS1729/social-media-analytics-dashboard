import React, { useState } from 'react';
import axios from 'axios';
import '../styles/twitter.css';

export default function Twitter() {
    const [username, setUsername] = useState('');
    const [data, setData] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');

    const fetchUserData = async () => {
        setStatusMessage('Fetching data...');
        setData(null); // Reset data before fetching new data
        try {
            const response = await axios.post('http://localhost:5000/get_profile', { username });
            setData(response.data);
            setStatusMessage('Data fetched successfully!');
        } catch (error) {
            setStatusMessage('Network slow. Please try again later.');
            console.error('Error fetching data', error);
        }
    };

    return (
        <div className="app-container">
            <h1>Twitter Analytics Dashboard</h1>
            <input
                type="text"
                placeholder="Enter Twitter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={fetchUserData}>Fetch Data</button>
            {statusMessage && <p className="status-message">{statusMessage}</p>}

            {data && (
                <div className="user-profile">
                    <img src={data.photo} alt="User Profile" className="profile-photo" />
                    <h2 className="user-name">{data.name}</h2>
                    <div className="user-stats">
                        <p><strong>Posts: {data.posts} |</strong></p>
                        <p><strong>Followers: {data.followers} |</strong></p>
                        <p><strong>Following {data.following} |</strong></p>
                        <p><strong>{data.joined_date} |</strong></p>
                    </div>
                    <div className="posts-section">
                        <h3>Recent Posts</h3>
                        {data.posts_data.length > 0 ? (
                            data.posts_data.map((post, index) => (
                                <div key={index} className="post-item">
                                    <p><strong>Likes:</strong> {post.likes}</p>
                                    <p><strong>Comments:</strong> {post.comments}</p>
                                    <p><strong>Reposts:</strong> {post.reposts}</p>
                                    <p><strong>Views:</strong> {post.views}</p>
                                </div>
                            ))
                        ) : (
                            <p>No posts available.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
