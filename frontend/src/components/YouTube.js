import React, { useState } from 'react';
import '../styles/YouTube.css';

function YouTube() {
  const [channelData, setChannelData] = useState(null);
  const [channelName, setChannelName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);

  const defaultProfileImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24' fill='none' stroke='%23667eea' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  const fetchYouTubeData = async () => {
    if (!channelName.trim()) {
      setError('Please enter a channel name');
      return;
    }

    if (!API_KEY) {
      setError('Please add your YouTube API key');
      return;
    }

    setLoading(true);
    setError('');
    setChannelData(null);

    try {
      // First, get channel ID from channel name
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(channelName)}&key=${API_KEY}&maxResults=1`
      );

      if (!searchResponse.ok) {
        throw new Error('Failed to search for channel');
      }

      const searchData = await searchResponse.json();

      if (!searchData.items || searchData.items.length === 0) {
        throw new Error('Channel not found');
      }

      const channelId = searchData.items[0].snippet.channelId;

      // Get channel statistics
      const channelResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${API_KEY}`
      );

      if (!channelResponse.ok) {
        throw new Error('Failed to fetch channel data');
      }

      const channelInfo = await channelResponse.json();

      // Get recent videos
      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=10&key=${API_KEY}`
      );

      if (!videosResponse.ok) {
        throw new Error('Failed to fetch videos');
      }

      const videosData = await videosResponse.json();

      // Get video statistics for each video
      const videoIds = videosData.items.map(item => item.id.videoId).join(',');
      const videoStatsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoIds}&key=${API_KEY}`
      );

      const videoStatsData = await videoStatsResponse.json();

      // Combine data
      const processedData = {
        channel: {
          name: channelInfo.items[0].snippet.title,
          description: channelInfo.items[0].snippet.description,
          subscriberCount: parseInt(channelInfo.items[0].statistics.subscriberCount) || 0,
          videoCount: parseInt(channelInfo.items[0].statistics.videoCount) || 0,
          viewCount: parseInt(channelInfo.items[0].statistics.viewCount) || 0,
          thumbnail: channelInfo.items[0].snippet.thumbnails.high?.url
        },
        videos: videoStatsData.items.map(video => ({
          id: video.id,
          title: video.snippet.title,
          publishedAt: video.snippet.publishedAt,
          viewCount: parseInt(video.statistics.viewCount) || 0,
          likeCount: parseInt(video.statistics.likeCount) || 0,
          commentCount: parseInt(video.statistics.commentCount) || 0,
          thumbnail: video.snippet.thumbnails.medium?.url
        }))
      };

      setChannelData(processedData);
    } catch (error) {
      console.error('Error fetching YouTube data:', error);
      setError(error.message || 'Failed to fetch YouTube data');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getEngagementRate = (video) => {
    if (video.viewCount === 0) return 0;
    const engagement = (video.likeCount + video.commentCount) / video.viewCount * 100;
    return engagement.toFixed(2);
  };

  const getAverageViews = () => {
    if (!channelData?.videos?.length) return 0;
    const totalViews = channelData.videos.reduce((sum, video) => sum + video.viewCount, 0);
    return Math.floor(totalViews / channelData.videos.length);
  };

  const getMostPopularVideo = () => {
    if (!channelData?.videos?.length) return null;
    return channelData.videos.reduce((max, video) =>
      video.viewCount > max.viewCount ? video : max
    );
  };

  const getTotalLikes = () => {
    if (!channelData?.videos?.length) return 0;
    return channelData.videos.reduce((sum, video) => sum + video.likeCount, 0);
  };

  const getPublishFrequency = () => {
    if (!channelData?.videos?.length) return 0;
    const dates = channelData.videos.map(v => new Date(v.publishedAt));
    const oldestDate = Math.min(...dates);
    const newestDate = Math.max(...dates);
    const daysDiff = (newestDate - oldestDate) / (1000 * 60 * 60 * 24);
    return daysDiff > 0 ? (channelData.videos.length / daysDiff * 7).toFixed(1) : 0;
  };

  return (
    <div className="youtube-container">
      <div className="youtube-wrapper">
        <div className="youtube-header">
          <h1 className="youtube-title">
            YouTube Channel Analytics
          </h1>
          <p className="youtube-subtitle">
            Enter a channel name to get detailed analytics and insights
          </p>
        </div>

        <div className="search-card">
          <div className="search-form">
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Enter YouTube Channel Name (e.g., MrBeast, PewDiePie)"
              className="search-input"
              onKeyPress={(e) => e.key === 'Enter' && fetchYouTubeData()}
            />
            <button
              onClick={fetchYouTubeData}
              disabled={loading}
              className={`search-button ${loading ? 'loading' : ''}`}
            >
              {loading ? 'Loading...' : 'Fetch Data'}
            </button>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        {channelData && (
          <div className="results-container">
            <div className="channel-card">
              <div className="channel-header">
                <img
                  src={imageError ? defaultProfileImage : channelData.channel.thumbnail}
                  alt={channelData.channel.name}
                  className="channel-avatar"
                  onError={() => setImageError(true)}
                />
                <div className="channel-info">
                  <h2 className="channel-name">
                    {channelData.channel.name}
                  </h2>
                  <p className="channel-description">
                    {channelData.channel.description?.substring(0, 150)}...
                  </p>
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card subscribers">
                  <div className="stat-number">
                    {formatNumber(channelData.channel.subscriberCount)}
                  </div>
                  <div className="stat-label">Subscribers</div>
                </div>
                <div className="stat-card views">
                  <div className="stat-number">
                    {formatNumber(channelData.channel.viewCount)}
                  </div>
                  <div className="stat-label">Total Views</div>
                </div>
                <div className="stat-card videos">
                  <div className="stat-number">
                    {channelData.channel.videoCount}
                  </div>
                  <div className="stat-label">Videos</div>
                </div>
                <div className="stat-card engagement">
                  <div className="stat-number">
                    {formatNumber(getTotalLikes())}
                  </div>
                  <div className="stat-label">Total Likes</div>
                </div>
              </div>
            </div>

            {/* Advanced Analytics */}
            <div className="analytics-card">
              <h3 className="section-title">Advanced Analytics</h3>
              <div className="analytics-grid">
                <div className="analytics-item">
                  <div className="analytics-icon">📊</div>
                  <div className="analytics-content">
                    <div className="analytics-value">{formatNumber(getAverageViews())}</div>
                    <div className="analytics-label">Average Views per Video</div>
                  </div>
                </div>
                <div className="analytics-item">
                  <div className="analytics-icon">🔥</div>
                  <div className="analytics-content">
                    <div className="analytics-value">{getPublishFrequency()}</div>
                    <div className="analytics-label">Videos per Week</div>
                  </div>
                </div>
                <div className="analytics-item">
                  <div className="analytics-icon">⭐</div>
                  <div className="analytics-content">
                    <div className="analytics-value">
                      {getMostPopularVideo() ? formatNumber(getMostPopularVideo().viewCount) : '0'}
                    </div>
                    <div className="analytics-label">Most Popular Video Views</div>
                  </div>
                </div>
                <div className="analytics-item">
                  <div className="analytics-icon">💬</div>
                  <div className="analytics-content">
                    <div className="analytics-value">
                      {channelData.videos.length > 0 ?
                        (channelData.videos.reduce((sum, v) => sum + v.commentCount, 0) / channelData.videos.length).toFixed(0) : '0'}
                    </div>
                    <div className="analytics-label">Avg Comments per Video</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Engagement Analysis */}
            <div className="engagement-card">
              <h3 className="section-title">Engagement Analysis</h3>
              <div className="engagement-chart">
                {channelData.videos.slice(0, 8).map((video, index) => {
                  const engagementRate = parseFloat(getEngagementRate(video));
                  const maxEngagement = Math.max(...channelData.videos.map(v => parseFloat(getEngagementRate(v))));
                  const height = maxEngagement > 0 ? (engagementRate / maxEngagement) * 150 : 0;

                  return (
                    <div key={video.id} className="engagement-bar">
                      <div
                        className="engagement-fill"
                        style={{ height: `${height}px` }}
                        title={`${video.title}: ${engagementRate}% engagement`}
                      ></div>
                      <div className="engagement-label">
                        {engagementRate}%
                      </div>
                      <div className="engagement-video">
                        Video {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="chart-caption">
                Engagement Rate (Likes + Comments / Views × 100)
              </div>
            </div>

            {/* Recent Videos */}
            <div className="videos-card">
              <h3 className="section-title">Recent Videos</h3>
              <div className="videos-grid">
                {channelData.videos.map((video) => (
                  <div key={video.id} className="video-card">
                    {video.thumbnail && (
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="video-thumbnail"
                      />
                    )}
                    <div className="video-info">
                      <h4 className="video-title">
                        {video.title}
                      </h4>
                      <div className="video-stats">
                        <div className="video-stat">
                          <span className="stat-icon">👁️</span>
                          Views: {formatNumber(video.viewCount)}
                        </div>
                        <div className="video-stat">
                          <span className="stat-icon">👍</span>
                          Likes: {formatNumber(video.likeCount)}
                        </div>
                        <div className="video-stat">
                          <span className="stat-icon">💬</span>
                          Comments: {formatNumber(video.commentCount)}
                        </div>
                        <div className="video-stat">
                          <span className="stat-icon">📅</span>
                          Published: {new Date(video.publishedAt).toLocaleDateString()}
                        </div>
                        <div className="video-stat engagement-stat">
                          <span className="stat-icon">📈</span>
                          Engagement: {getEngagementRate(video)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Performance Chart */}
            <div className="chart-card">
              <h3 className="section-title">Video Performance</h3>
              <div className="chart-container">
                {channelData.videos.slice(0, 8).map((video, index) => {
                  const maxViews = Math.max(...channelData.videos.map(v => v.viewCount));
                  const height = (video.viewCount / maxViews) * 200;

                  return (
                    <div key={video.id} className="chart-bar">
                      <div
                        className="bar"
                        style={{ height: `${height}px` }}
                        title={`${video.title}: ${formatNumber(video.viewCount)} views`}
                      ></div>
                      <div className="bar-label">
                        Video {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="chart-caption">
                Views comparison for recent videos
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default YouTube;
