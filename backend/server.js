const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
        profileData.error = 'Error fetching data. Please try again later.';
    }

    await browser.close();
    return profileData;
}
