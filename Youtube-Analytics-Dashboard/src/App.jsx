import React, { useState } from 'react';
import ChannelStatistics from './components/ChannelStatistics';
import VideoLikesChart from './components/VideoLikesChart';
import Videos from './components/Videos';
import './App.css';

function App() {
  const [channelData, setChannelData] = useState(null);
  const [channelName, setChannelName] = useState('TED');

  const fetchYouTubeData = async () => {
    if (!channelName) return;

    try {
      const response = await fetch(`http://localhost:5000/youtube/${channelName}`);
      const data = await response.json();
      console.log('Fetched Data:', data);
      setChannelData(data);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
    }
  };

  return (
    <div className="app-container">
      <h1>YouTube Channel Analytics</h1>
      <div className='grp'>
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Enter YouTube Channel Name"
          className="input-field"
        />
        <button onClick={fetchYouTubeData} className="fetch-button">
          Fetch Data
        </button>
      </div>

      {channelData && (
        <>
          <ChannelStatistics channelData={channelData} channelName={channelName} />
          <Videos channelData={channelData} channelName={channelName} />
          <VideoLikesChart videoStats={channelData.videoStats} />
        </>
      )}
    </div>
  );
}

export default App;
