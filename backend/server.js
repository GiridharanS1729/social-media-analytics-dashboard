// // const express = require('express');
// // const fetch = require('node-fetch');
// // const cors = require('cors');
// // const jwt = require('jsonwebtoken');
// // const bcrypt = require('bcryptjs');
// // const mongoose = require('mongoose');
// // require('dotenv').config(); // To use environment variables
// // const router = express.Router();
// // // MongoDB User Model
// // const userSchema = new mongoose.Schema({
// //   email: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// // });

// // // Encrypt password before saving it to the database
// // userSchema.pre('save', async function (next) {
// //   if (!this.isModified('password')) return next();
// //   this.password = await bcrypt.hash(this.password, 10);
// //   next();
// // });

// // // Method to compare hashed password
// // userSchema.methods.comparePassword = function (password) {
// //   return bcrypt.compare(password, this.password);
// // };

// // const User = mongoose.model('User', userSchema);

// // const app = express();
// // app.use(cors()); // Allow requests from any origin
// // app.use(express.json()); // Middleware to parse JSON bodies

// // const PORT = process.env.PORT || 5000;
// // const API_KEY = process.env.YOUTUBE_API_KEY;

// // // Connect to MongoDB
// // mongoose.connect(process.env.MONGO_URI, {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // })
// // .then(() => console.log('MongoDB connected'))
// // .catch((err) => console.log('MongoDB connection error:', err));

// // // Route to handle user signup and immediate login
// // app.post('/signup', async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     // Check if the user already exists
// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) {
// //       return res.status(400).json({ error: 'User already exists' });
// //     }

// //     // Create a new user
// //     const newUser = new User({ email, password });
// //     await newUser.save();

// //     // After creating the user, log them in automatically
// //     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
// //       expiresIn: '1h',
// //     });

// //     res.status(201).json({ message: 'User created and logged in successfully', token });
// //   } catch (error) {
// //     console.error('Error during signup:', error);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });

// // router.get('/user', (req, res) => {
// //   const token = req.headers.authorization?.split(' ')[1];
  
// //   if (!token) {
// //       return res.status(401).json({ error: 'No token provided' });
// //   }
  
// //   jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
// //       if (err) {
// //           return res.status(401).json({ error: 'Invalid or expired token' });
// //       }
// //       const user = await User.findById(decoded.userId); // Assuming the token has userId
// //       res.json({ user });
// //   });
// // });


// // // Route to handle user login
// // app.post('/login', async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     // Find the user by email
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ error: 'Invalid credentials' });
// //     }

// //     // Compare the password
// //     const isMatch = await user.comparePassword(password);
// //     if (!isMatch) {
// //       return res.status(400).json({ error: 'Invalid credentials' });
// //     }

// //     // Create a JWT token
// //     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
// //       expiresIn: '1h',
// //     });

// //     res.json({ message: 'Login successful', token });
// //   } catch (error) {
// //     console.error('Error during login:', error);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });

// // // Route to fetch YouTube channel statistics by channel name
// // app.get('/youtube/:channelName', async (req, res) => {
// //   const { channelName } = req.params;

// //   try {
// //     const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelName}&type=channel&key=${API_KEY}`;
// //     const searchResponse = await fetch(searchUrl);
// //     const searchData = await searchResponse.json();

// //     if (!searchData.items || searchData.items.length === 0) {
// //       return res.status(404).json({ error: 'Channel not found' });
// //     }

// //     const channelId = searchData.items[0].id.channelId;

// //     const statsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;
// //     const statsResponse = await fetch(statsUrl);
// //     const statsData = await statsResponse.json();

// //     if (!statsData.items || statsData.items.length === 0) {
// //       return res.status(404).json({ error: 'Channel statistics not found' });
// //     }

// //     const channelStats = statsData.items[0].statistics;

// //     const maxv = 5;

// //     const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxv}&order=viewCount&type=video&key=${API_KEY}`;
// //     const videosResponse = await fetch(videosUrl);
// //     const videosData = await videosResponse.json();

// //     const videoStats = [];

// //     for (const video of videosData.items) {
// //       const videoId = video.id.videoId;

// //       const videoStatsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${API_KEY}`;
// //       const videoStatsResponse = await fetch(videoStatsUrl);
// //       const videoStatsData = await videoStatsResponse.json();

// //       if (videoStatsData.items.length > 0) {
// //         const likeCount = videoStatsData.items[0].statistics.likeCount;
// //         const thumbnailUrl = videoStatsData.items[0].snippet.thumbnails.default.url;

// //         videoStats.push({
// //           title: video.snippet.title,
// //           likeCount,
// //           thumbnailUrl,
// //           videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
// //         });
// //       }
// //     }

// //     res.json({
// //       channelStats: {
// //         subscriberCount: channelStats.subscriberCount,
// //         viewCount: channelStats.viewCount,
// //         videoCount: channelStats.videoCount,
// //       },
// //       videoStats,
// //     });
// //   } catch (error) {
// //     console.error('Error fetching YouTube data:', error);
// //     res.status(500).json({ error: 'Internal server error' });
// //   }
// // });

// // // Start the server
// // app.listen(PORT, () => {
// //   console.log(`Server is running on http://localhost:${PORT}/`);
// // });


// const express = require('express');
// const fetch = require('node-fetch'); // to make API requests
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const mongoose = require('mongoose');
// const puppeteer = require('puppeteer');
// require('dotenv').config(); // To use environment variables

// const app = express();
// app.use(cors()); // Allow requests from any origin
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// const PORT = process.env.PORT || 5000;
// const API_KEY = process.env.YOUTUBE_API_KEY;
// const bravepath = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

// // MongoDB User Model
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Encrypt password before saving it to the database
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Method to compare hashed password
// userSchema.methods.comparePassword = function (password) {
//   return bcrypt.compare(password, this.password);
// };

// const User = mongoose.model('User', userSchema);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log('MongoDB connection error:', err));

// // Route to handle user signup and immediate login
// app.post('/signup', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User already exists' });
//     }

//     // Create a new user
//     const newUser = new User({ email, password });
//     await newUser.save();

//     // After creating the user, log them in automatically
//     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.status(201).json({ message: 'User created and logged in successfully', token });
//   } catch (error) {
//     console.error('Error during signup:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to handle user login
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     // Compare the password
//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) {
//       return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     // Create a JWT token
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Route to get user info
// app.get('/user', async (req, res) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ error: 'Invalid or expired token' });
//     }
//     const user = await User.findById(decoded.userId);
//     res.json({ user });
//   });
// });

// // YouTube Route
// app.get('/youtube/:channelName', async (req, res) => {
//   const { channelName } = req.params;

//   try {
//     const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelName}&type=channel&key=${API_KEY}`;
//     const searchResponse = await fetch(searchUrl);
//     const searchData = await searchResponse.json();

//     if (!searchData.items || searchData.items.length === 0) {
//       return res.status(404).json({ error: 'Channel not found' });
//     }

//     const channelId = searchData.items[0].id.channelId;
//     const statsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;
//     const statsResponse = await fetch(statsUrl);
//     const statsData = await statsResponse.json();

//     if (!statsData.items || statsData.items.length === 0) {
//       return res.status(404).json({ error: 'Channel statistics not found' });
//     }

//     const channelStats = statsData.items[0].statistics;
//     const maxv = 5;
//     const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxv}&order=viewCount&type=video&key=${API_KEY}`;
//     const videosResponse = await fetch(videosUrl);
//     const videosData = await videosResponse.json();

//     const videoStats = [];
//     for (const video of videosData.items) {
//       const videoId = video.id.videoId;
//       const videoStatsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${API_KEY}`;
//       const videoStatsResponse = await fetch(videoStatsUrl);
//       const videoStatsData = await videoStatsResponse.json();

//       if (videoStatsData.items.length > 0) {
//         const likeCount = videoStatsData.items[0].statistics.likeCount;
//         const thumbnailUrl = videoStatsData.items[0].snippet.thumbnails.default.url;

//         videoStats.push({
//           title: video.snippet.title,
//           likeCount,
//           thumbnailUrl,
//           videoUrl: `https://www.youtube.com/watch?v=${videoId}`
//         });
//       }
//     }

//     res.json({
//       channelStats: {
//         subscriberCount: channelStats.subscriberCount,
//         viewCount: channelStats.viewCount,
//         videoCount: channelStats.videoCount,
//       },
//       videoStats,
//     });
//   } catch (error) {
//     console.error('Error fetching YouTube data:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Twitter (X) Route
// app.post('/get_profile', async (req, res) => {
//   const username = req.body.username;
//   const profileData = await fetchProfileData(username);

//   if (profileData.error) {
//     console.log('Error fetching profile data:', profileData.error);
//     return res.status(400).json({ message: profileData.error });
//   }

//   console.log('Fetched Profile Data:', profileData);
//   res.json(profileData);
// });

// async function fetchProfileData(username) {
//   const browser = await puppeteer.launch({
//     headless: false,
//     executablePath: bravepath,
//     args: [
//       '--disable-blink-features=AutomationControlled',
//       '--no-sandbox',
//       '--disable-setuid-sandbox',
//       '--disable-web-security',
//       '--allow-running-insecure-content'
//     ]
//   });

//   const page = await browser.newPage();
//   await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

//   const profileData = {};

//   try {
//     console.log(`Navigating to https://x.com/${username}`);
//     await page.goto(`https://x.com/${username}`, { waitUntil: 'networkidle2' });

//     profileData.photo = await page.$eval('img[src*="profile_images"]', el => el.src).catch(() => '');
//     profileData.name = await page.$eval('div[data-testid="UserName"] span', el => el.textContent).catch(() => 'Unknown User');
//     profileData.posts = await page.$eval('.r-n6v787', el => el.textContent).catch(() => '0');
//     profileData.following = await page.$eval(`a[href="/${username}/following"] span`, el => el.textContent).catch(() => '0');
//     profileData.followers = await page.$eval(`a[href="/${username}/verified_followers"] span`, el => el.textContent).catch(() => '0');
//     profileData.joined_date = await page.evaluate(() => {
//       const spans = Array.from(document.querySelectorAll('span'));
//       const joinedSpan = spans.find(span => span.textContent.includes('Joined'));
//       return joinedSpan ? joinedSpan.textContent : 'Unknown';
//     });

//     profileData.posts_data = [];
//     const posts = await page.$$('article');
//     for (let i = 0; i < Math.min(posts.length, 5); i++) {
//       const post = posts[i];
//       const likes = await post.$eval('[data-testid="like"] span', el => el.textContent).catch(() => '0');
//       const text = await post.$eval('div[data-testid="tweetText"]', el => el.textContent).catch(() => 'Post unavailable');
//       const date = await post.$eval('time', el => el.getAttribute('datetime')).catch(() => 'Date unknown');

//       profileData.posts_data.push({ likes, text, date });
//     }
//   } catch (error) {
//     console.error('Error fetching profile data:', error);
//     profileData.error = 'Failed to fetch profile data';
//   } finally {
//     await browser.close();
//   }

//   return profileData;
// }

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




const express = require('express');
const fetch = require('node-fetch'); // to make API requests
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
require('dotenv').config(); // To use environment variables

const app = express();
app.use(cors()); // Allow requests from any origin
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.YOUTUBE_API_KEY;
const bravepath = 'C:\\Users\\Giri\\AppData\\Local\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

// MongoDB User Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Encrypt password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare hashed password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Route to handle user signup and immediate login
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    // After creating the user, log them in automatically
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User created and logged in successfully', token });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get user info
app.get('/user', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    const user = await User.findById(decoded.userId);
    res.json({ user });
  });
});

// YouTube Route
app.get('/youtube/:channelName', async (req, res) => {
  const { channelName } = req.params;

  try {
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelName}&type=channel&key=${API_KEY}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return res.status(404).json({ error: 'Channel not found' });
    }

    const channelId = searchData.items[0].id.channelId;
    const statsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;
    const statsResponse = await fetch(statsUrl);
    const statsData = await statsResponse.json();

    if (!statsData.items || statsData.items.length === 0) {
      return res.status(404).json({ error: 'Channel statistics not found' });
    }

    const channelStats = statsData.items[0].statistics;
    const maxv = 5;
    const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=${maxv}&order=viewCount&type=video&key=${API_KEY}`;
    const videosResponse = await fetch(videosUrl);
    const videosData = await videosResponse.json();

    const videoStats = [];
    for (const video of videosData.items) {
      const videoId = video.id.videoId;
      const videoStatsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${videoId}&key=${API_KEY}`;
      const videoStatsResponse = await fetch(videoStatsUrl);
      const videoStatsData = await videoStatsResponse.json();

      if (videoStatsData.items.length > 0) {
        const likeCount = videoStatsData.items[0].statistics.likeCount;
        const thumbnailUrl = videoStatsData.items[0].snippet.thumbnails.default.url;

        videoStats.push({
          title: video.snippet.title,
          likeCount,
          thumbnailUrl,
          videoUrl: `https://www.youtube.com/watch?v=${videoId}`
        });
      }
    }

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

// Twitter (X) Route
app.post('/get_profile', async (req, res) => {
  const username = req.body.username;
  const profileData = await fetchProfileData(username);

  if (profileData.error) {
    console.log('Error fetching profile data:', profileData.error);
    return res.status(400).json({ message: profileData.error });
  }

  console.log('Fetched Profile Data:', profileData);
  res.json(profileData);
});




async function fetchProfileData(username) {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: bravepath,
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-web-security',
      '--allow-running-insecure-content'
    ]
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

  const profileData = {};

  try {
    console.log(`Navigating to https://x.com/${username}`);
    await page.goto(`https://x.com/${username}`, { waitUntil: 'networkidle2' });

    // Fetch user photo and name
    profileData.photo = await page.$eval('img[src*="profile_images"]', el => el.src).catch(() => '');
    profileData.name = await page.$eval('div[data-testid="UserName"] span', el => el.textContent).catch(() => 'Unknown User');

    // Fetch posts, followers, and following count
    profileData.posts = await page.$eval('.r-n6v787', el => el.textContent).catch(() => '0');
    profileData.following = await page.$eval(`a[href="/${username}/following"] span`, el => el.textContent).catch(() => '0');
    profileData.followers = await page.$eval(`a[href="/${username}/verified_followers"] span`, el => el.textContent).catch(() => '0');

    // Fetch joined date
    profileData.joined_date = await page.evaluate(() => {
      const spans = Array.from(document.querySelectorAll('span'));
      const joinedSpan = spans.find(span => span.textContent.includes('Joined'));
      return joinedSpan ? joinedSpan.textContent : 'Unknown';
    });

    // Fetch first 5 posts data
    profileData.posts_data = [];
    const posts = await page.$$('article');
    for (let i = 0; i < Math.min(posts.length, 5); i++) {
      const post = posts[i];
      const likes = await post.$eval('[data-testid="like"] span', el => el.textContent).catch(() => '0');
      const comments = await post.$eval('[data-testid="reply"] span', el => el.textContent).catch(() => '0');
      const reposts = await post.$eval('[data-testid="retweet"] span', el => el.textContent).catch(() => '0');
      const views = await post.$eval('[data-testid="view"] span', el => el.textContent).catch(() => '0');

      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second for each post fetch
      profileData.posts_data.push({ likes, comments, reposts, views });
    }

    console.log('Fetched posts data:', profileData.posts_data);
  } catch (error) {
    console.error('Error fetching profile data:', error);
    profileData.error = 'Network slow. Please try again later.';
  }

  await browser.close();
  return profileData;
}



// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
