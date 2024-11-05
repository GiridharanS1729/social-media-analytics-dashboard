import React from 'react';
import 'chart.js/auto';
import '../styles/Videos.css';

const formatNumber = (num) => {
    if (num >= 1e6) {
        return (num / 1e6).toFixed(1) + 'M'; 
    } else if (num >= 1e3) {
        return (num / 1e3).toFixed(1) + 'K'; 
    }
    return num; 
};

export default function Videos({ channelData, channelName }) {
    
    const sortedVideos = channelData.videoStats?.sort((a, b) => b.likeCount - a.likeCount) || [];

    return (
        <div className='vid-main'>
            <h2 style={{ marginTop: '40px' }}>Top 5 Videos</h2>
            <div className="video-container">
                {sortedVideos.map((video) => (
                    <div key={video.videoId} className="video-card">
                        <img src={video.thumbnailUrl} alt={video.title} />
                        <p>{video.title}</p>
                        <p><strong>👍🏿</strong> {formatNumber(video.likeCount)} Likes</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
