import React, { useState } from 'react';
import ChannelStatistics from './ChannelStatistics';
import VideoLikesChart from './VideoLikesChart';
import Videos from './Videos';
import '../styles/YouTube.css';

function YouTube() {
  const [channelData, setChannelData] = useState(null);
  const [channelName, setChannelName] = useState('');

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
    <div className="youtube-container">
      <video autoPlay loop muted className="video-background">
                <source src="D:\1_credit_project\smad_0811\frontend\src\images\bg.mp4" type="video/mp4" />
            </video>
      <h1 className="youtube-title">YouTube Channel Analytics</h1>
      <div className='input-group'>
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
          <div className="card">
            <ChannelStatistics channelData={channelData} channelName={channelName} />
          </div>
          <div className="card">
            <Videos channelData={channelData} channelName={channelName} />
          </div>
          <div className="card">
            <VideoLikesChart videoStats={channelData.videoStats} />
          </div>
        </>
      )}
    </div>
  );
}

export default YouTube;

// import React, { useState, useEffect } from 'react';
// import ChannelStatistics from './ChannelStatistics';
// import VideoLikesChart from './VideoLikesChart';
// import Videos from './Videos';
// import '../styles/YouTube.css';

// function YouTube() {
//   const [channelData, setChannelData] = useState(null);
//   const [channelName, setChannelName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [searchHistory, setSearchHistory] = useState([]); // Ensure it's initialized as an array
//   const [showHistory, setShowHistory] = useState(false);

//   const fetchYouTubeData = async () => {
//     if (!channelName) return;

//     setLoading(true);
//     setError('');
//     setChannelData(null);

//     try {
//       const response = await fetch(`http://localhost:5000/youtube/${channelName}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       const data = await response.json();
//       if (response.ok) {
//         setChannelData(data);
//       } else {
//         setError(data.error);
//       }
//     } catch (error) {
//       setError('Failed to fetch YouTube data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchSearchHistory = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/search-history', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       const data = await response.json();
      
//       // Ensure searchHistory is always an array
//       if (Array.isArray(data)) {
//         setSearchHistory(data);
//       } else {
//         setSearchHistory([]);
//       }
//     } catch (error) {
//       console.error('Error fetching search history:', error);
//     }
//   };

//   useEffect(() => {
//     if (localStorage.getItem('token')) {
//       fetchSearchHistory();
//     }
//   }, []);

//   const handleHistoryClick = (term) => {
//     setChannelName(term);
//     setShowHistory(false);
//     fetchYouTubeData(); // Automatically fetch data when a history item is clicked
//   };

//   return (
//     <div className="youtube-container">
//       <h1 className="youtube-title">YouTube Channel Analytics</h1>
//       <div className="youtube-input-container">
//         <input
//           type="text"
//           value={channelName}
//           onChange={(e) => setChannelName(e.target.value)}
//           placeholder="Enter YouTube Channel Name"
//         />
//         <button onClick={fetchYouTubeData}>Search</button>
//       </div>

//       {loading && <div>Loading...</div>}
//       {error && <div className="error">{error}</div>}
//       {channelData && (
//         <div className="youtube-results">
//           <ChannelStatistics data={channelData.channelStats} />
//           <VideoLikesChart data={channelData.videoStats} />
//           <Videos data={channelData.videoStats} />
//         </div>
//       )}

//       <div className="history-container">
//         <button onClick={() => setShowHistory(!showHistory)}>
//           {showHistory ? 'Hide Search History' : 'Show Search History'}
//         </button>
//         {showHistory && (
//           <div className="history-list">
//             <ul>
//               {Array.isArray(searchHistory) &&
//                 searchHistory.map((item) => (
//                   <li key={item._id} onClick={() => handleHistoryClick(item.term)}>
//                     {item.term}
//                   </li>
//                 ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default YouTube;
