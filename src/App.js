import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
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
    <div style={{ padding: '20px' }}>
      <h1>Twitter Analytics Dashboard</h1>
      <input
        type="text"
        placeholder="Enter Twitter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchUserData}>Fetch Data</button>
      {statusMessage && <p>{statusMessage}</p>}
      {data && (
        <div>
          <h2>User Stats</h2>
          <p>Posts: {data.posts}</p>
          <p>Followers: {data.followers}</p>
          <p>Following: {data.following}</p>
          <p>Joined Date: {data.joined_date}</p>

          <h2>First 5 Posts Engagement</h2>
          {data.posts_data && data.posts_data.length > 0 ? (
            data.posts_data.map((post, index) => (
              <div key={index} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                <h3>Post {index + 1}</h3>
                <p>Likes: {post.likes}</p>
                <p>Comments: {post.comments}</p>
                <p>Reposts: {post.reposts}</p>
                <p>Views: {post.views}</p>
              </div>
            ))
          ) : (
            <p>No posts data available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
