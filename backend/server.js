const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


async function fetchProfileData(username) {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'C:\\Users\\Giri\\AppData\\Local\\BraveSoftware\\Brave-Browser\\Application\\brave.exe',
        args: [
            '--disable-blink-features=AutomationControlled',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security',
            '--allow-running-insecure-content'
        ]
    });
    const page = await browser.newPage();

    // Set a user agent string
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Navigate to the user's Twitter profile
    try {
        console.log(`Navigating to https://x.com/${username}`);
        await page.goto(`https://x.com/${username}`, { waitUntil: 'networkidle2' });
    } catch (err) {
        console.error('Error navigating to profile:', err);
        await browser.close();
        return { error: 'Error navigating to profile. Please check the username.' };
    }

    const profileData = {};

    // Fetch posts count
    try {
        profileData.posts = await page.$eval('.r-n6v787', el => el.textContent);
        console.log(`Posts: ${profileData.posts}`);
    } catch (err) {
        console.error('Error fetching posts:', err);
        profileData.posts = "0";
    }

    // Fetch following count
    try {
        profileData.following = await page.$eval(`a[href="/${username}/following"] span`, el => el.textContent);
        console.log(`Following: ${profileData.following}`);
    } catch (err) {
        console.error('Error fetching following count:', err);
        profileData.following = "0";
    }

    // Fetch followers count
    try {
        profileData.followers = await page.$eval(`a[href="/${username}/verified_followers"] span`, el => el.textContent);
        console.log(`Followers: ${profileData.followers}`);
    } catch (err) {
        console.error('Error fetching followers count:', err);
        profileData.followers = "0";
    }

    // Fetch joined date
    try {
        profileData.joined_date = await page.evaluate(() => {
            const spans = Array.from(document.querySelectorAll('span'));
            const joinedSpan = spans.find(span => span.textContent.includes('Joined'));
            return joinedSpan ? joinedSpan.textContent : "0";
        });
        console.log(`Joined Date: ${profileData.joined_date}`);
    } catch (err) {
        console.error('Error fetching joined date:', err);
        profileData.joined_date = "0";
    }

    // Fetch first 5 posts data
    profileData.posts_data = [];
    try {
        const posts = await page.$$('article');
        for (let i = 0; i < Math.min(posts.length, 5); i++) {
            const post = posts[i];
            const likes = await post.$eval('[data-testid="like"] span', el => el.textContent).catch(() => '0');
            const comments = await post.$eval('[data-testid="reply"] span', el => el.textContent).catch(() => '0');
            const reposts = await post.$eval('[data-testid="retweet"] span', el => el.textContent).catch(() => '0');
            const views = await post.$eval('[data-testid="view"] span', el => el.textContent).catch(() => '0');

            profileData.posts_data.push({
                likes: likes,
                comments: comments,
                reposts: reposts,
                views: views
            });
        }
        console.log(`Fetched posts data:`, profileData.posts_data);
    } catch (err) {
        console.error('Error fetching posts data:', err);
        profileData.posts_data = [];
    }

    await browser.close();
    return profileData;
}
