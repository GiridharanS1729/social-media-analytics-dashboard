import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [username, setUsername] = useState('Cristiano');
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
      <h1>Twitter Profile Engagement</h1>
      <input
        type="text"
        placeholder="Enter Twitter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchUserData}>Fetch Profile</button>
      {statusMessage && <p className="status-message">{statusMessage}</p>}

      {data && (
        <div className="profile-info">
          <h2>Profile Information</h2>
          <div className="profile-info-grid">
            <div className="profile-photo-card">
              <img src={data.photo} alt="User Profile" className="profile-photo" />
              <h3>{data.name}</h3>
            </div>
            <div className="profile-stats">
              <p><strong>Followers:</strong> {data.followers}</p>
              <p><strong>Following:</strong> {data.following}</p>
              <p><strong>Posts:</strong> {data.posts}</p>
              <p><strong> {data.joined_date}</strong></p>
              {/* <p><strong>Bio:</strong> {data.bio}</p> */}
            </div>
          </div>
          <h3>Recent Posts</h3>
          <div className="posts-section">
            {data.posts_data.length > 0 ? (
              data.posts_data.map((post, index) => (
                <div key={index} className="tweet-card">
                  <p><strong>Likes:</strong> {post.likes}</p>
                  <p><strong>Comments:</strong> {post.comments}</p>
                  <p><strong>Reposts:</strong> {post.reposts}</p>
                  {/* <p><strong>Views:</strong> {post.views}</p> */}
                </div>
              ))
            ) : (
              <p>No tweets available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
