import React, { useState, useEffect } from 'react';
import { Search, Users, MessageCircle, Heart, Repeat2, Calendar, MapPin, Link, Verified } from 'lucide-react';
import '../styles/Twitter.css';

const TwitterAnalytics = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Mock data for BCCI (since we can't make actual API calls)
  const mockBCCIData = {
    id: '92319253',
    username: 'BCCI',
    name: 'BCCI',
    verified: true,
    description: 'Official account of the Board of Control for Cricket in India (BCCI). Follow us for all the latest updates on Indian Cricket.',
    location: 'India',
    url: 'https://www.bcci.tv',
    followers_count: 15200000,
    following_count: 45,
    tweet_count: 12500,
    listed_count: 8900,
    created_at: '2009-11-26T10:30:00.000Z',
    profile_image_url: 'https://pbs.twimg.com/profile_images/1692077157512785920/z9C1zW17_200x200.jpg',
    profile_banner_url: 'https://pbs.twimg.com/profile_banners/185142711/1741541876/1080x360',
    public_metrics: {
      followers_count: 15200000,
      following_count: 45,
      tweet_count: 12500,
      listed_count: 8900
    },
    recent_tweets: [
      {
        id: '1',
        text: '🏏 What a fantastic match! Congratulations to Team India on another stellar performance. The future of Indian cricket looks brighter than ever! #TeamIndia #Cricket',
        created_at: '2025-05-26T14:30:00.000Z',
        public_metrics: {
          retweet_count: 8500,
          like_count: 45000,
          reply_count: 2100,
          quote_count: 1200
        }
      },
      {
        id: '2',
        text: '📅 Mark your calendars! The upcoming series promises to be an absolute thriller. Get ready for some world-class cricket action! 🎯',
        created_at: '2025-05-25T10:15:00.000Z',
        public_metrics: {
          retweet_count: 6200,
          like_count: 32000,
          reply_count: 1800,
          quote_count: 900
        }
      },
      {
        id: '3',
        text: '🌟 Young talent shining bright! Our grassroots programs continue to nurture the next generation of cricket stars. #CricketDevelopment',
        created_at: '2025-05-24T16:45:00.000Z',
        public_metrics: {
          retweet_count: 4100,
          like_count: 28000,
          reply_count: 1200,
          quote_count: 650
        }
      }
    ]
  };

  const fetchUserData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (username.toLowerCase() === 'bcci' || username=='') {
        setUserData(mockBCCIData);
      } else {
        // For other usernames, create mock data
        setUserData({
          ...mockBCCIData,
          username: username,
          name: username,
          verified: false,
          followers_count: Math.floor(Math.random() * 1000000),
          following_count: Math.floor(Math.random() * 1000),
          tweet_count: Math.floor(Math.random() * 10000),
          description: `Mock profile data for @${username || "BCCI"}. This is a demonstration of the Twitter Analytics interface.`
        });
      }
    } catch (err) {
      setError('Failed to fetch user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch BCCI data on component mount
 

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateEngagementRate = (tweet) => {
    const totalEngagements = tweet.public_metrics.like_count +
      tweet.public_metrics.retweet_count +
      tweet.public_metrics.reply_count;
    const rate = (totalEngagements / userData.followers_count) * 100;
    return rate.toFixed(2);
  };

  return (
    <div className="twitter-analytics">
      <div className="header">
        <h1>X Profile Analytics</h1>
        <p>Real-time Twitter profile data and engagement metrics</p>
      </div>

      <div className="search-section">
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Enter Twitter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="username-input"
            onKeyPress={(e) => e.key === 'Enter' && !loading && fetchUserData()}
          />
          <button
            onClick={fetchUserData}
            disabled={loading}
            className="analyze-btn"
          >
            {loading ? 'Fetching...' : 'Analyze Profile'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {userData && (
        <div className="results-container">
          <div className="profile-section">
              <div className="profile-bg">
                <img src={userData.profile_banner_url} className='profile-bg-img' alt={userData.name} />
              </div>
            <div className="profile-header">

              <div className="profile-avatar">
                <div className="avatar-placeholder">
                  <img src={userData.profile_image_url} alt={userData.name} />
                </div>
              </div>
              <div className="profile-info">
                <div className="profile-name">
                  <h2>{userData.name}</h2>
                  {userData.verified && <Verified className="verified-icon" size={20} />}
                </div>
                <p className="username">@{userData.username}</p>
                <p className="bio">{userData.description}</p>

                <div className="profile-meta">
                  {userData.location && (
                    <span className="meta-item">
                      <MapPin size={16} />
                      {userData.location}
                    </span>
                  )}
                  {userData.url && (
                    <span className="meta-item">
                      <Link size={16} />
                      Website
                    </span>
                  )}
                  <span className="meta-item">
                    <Calendar size={16} />
                    Joined {formatDate(userData.created_at)}
                  </span>
                </div>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-number">{formatNumber(userData.followers_count)}</div>
                <div className="stat-label">Followers</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{formatNumber(userData.following_count)}</div>
                <div className="stat-label">Following</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{formatNumber(userData.tweet_count)}</div>
                <div className="stat-label">Posts</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">{formatNumber(userData.listed_count)}</div>
                <div className="stat-label">Lists</div>
              </div>
            </div>
          </div>

          <div className="tweets-section">
            <h3>Recent Posts Analysis</h3>
            <div className="tweets-container">
              {userData.recent_tweets?.map((tweet) => (
                <div key={tweet.id} className="tweet-card">
                  <div className="tweet-content">
                    <p>{tweet.text}</p>
                    <span className="tweet-date">{formatDate(tweet.created_at)}</span>
                  </div>

                  <div className="tweet-metrics">
                    <div className="metric">
                      <Heart size={16} />
                      <span>{formatNumber(tweet.public_metrics.like_count)}</span>
                    </div>
                    <div className="metric">
                      <Repeat2 size={16} />
                      <span>{formatNumber(tweet.public_metrics.retweet_count)}</span>
                    </div>
                    <div className="metric">
                      <MessageCircle size={16} />
                      <span>{formatNumber(tweet.public_metrics.reply_count)}</span>
                    </div>
                    <div className="engagement-rate">
                      {calculateEngagementRate(tweet)}% engagement
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default TwitterAnalytics;