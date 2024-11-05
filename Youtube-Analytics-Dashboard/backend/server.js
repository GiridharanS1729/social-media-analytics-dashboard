const express = require('express');
const fetch = require('node-fetch'); // to make API requests
const cors = require('cors');
require('dotenv').config(); // To use environment variables

const app = express();
app.use(cors()); // Allow requests from any origin

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.YOUTUBE_API_KEY;

// Route to fetch YouTube channel statistics by channel name
app.get('/youtube/:channelName', async (req, res) => {
  const { channelName } = req.params;

  try {
    // Step 1: Get channel details by searching for the channel name
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelName}&type=channel&key=${API_KEY}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    const channelId = searchData.items[0].id.channelId;

    // Step 2: Get channel statistics using the channel ID
    const statsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;
    const statsResponse = await fetch(statsUrl);
    const statsData = await statsResponse.json();

    if (!statsData.items || statsData.items.length === 0) {
      return res.status(404).json({ error: 'Channel statistics not found' });
    }

    const channelStats = statsData.items[0].statistics;

    const maxv = 5;

    // Step 3: Fetch the top 5 videos for the channel
    const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxv}&order=viewCount&type=video&key=${API_KEY}`;
    const videosResponse = await fetch(videosUrl);
    const videosData = await videosResponse.json();

    const videoStats = [];

    // Step 4: Fetch individual video statistics and thumbnails
    for (const video of videosData.items) {
      const videoId = video.id.videoId;

      // Fetch individual video statistics including thumbnails
      const videoStatsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${API_KEY}`;
      const videoStatsResponse = await fetch(videoStatsUrl);
      const videoStatsData = await videoStatsResponse.json();

      if (videoStatsData.items.length > 0) {
        const likeCount = videoStatsData.items[0].statistics.likeCount;
        const thumbnailUrl = videoStatsData.items[0].snippet.thumbnails.default.url; // Change 'default' to 'medium' or 'high' if needed

        videoStats.push({
          title: video.snippet.title,
          likeCount,
          thumbnailUrl // Add thumbnail URL for each video
        });
      }
    }

    // Return the channel statistics and top 5 video stats including thumbnails
    res.json({
      channelStats: {
        subscriberCount: channelStats.subscriberCount,
        viewCount: channelStats.viewCount,
        videoCount: channelStats.videoCount,
      },
      videoStats,
    });
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});
