import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Importing the CSS file

function App() {
  const [username, setUsername] = useState('BCCI');
  const [data, setData] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');

  const fetchUserData = async () => {
    setStatusMessage('Fetching data...');
    try {
      const response = await axios.post('http://localhost:5000/get_profile', { username });
      setData(response.data);
      setStatusMessage('Data fetched successfully!');
    } catch (error) {
      setStatusMessage('Error fetching data. Please check the username and try again.');
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
        <div className="user-stats">
          <h2>User Stats</h2>
          <p>Posts: {data.posts}</p>
          <p>Followers: {data.followers}</p>
          <p>Following: {data.following}</p>
          <p>Joined Date: {data.joined_date}</p>

          {data.posts_data && (
            <div>
              <h2>First 5 Posts Analytics</h2>
              <div className="post-analytics">

                {data.posts_data.map((post, index) => (
                  <div className="post" key={index}>
                    <h3>Post {index + 1}</h3>
                    <p><strong>Likes:</strong> {post.likes}</p>
                    <p><strong>Comments:</strong> {post.comments}</p>
                    <p><strong>Reposts:</strong> {post.reposts}</p>
                    <p><strong>Views:</strong> {post.views}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
