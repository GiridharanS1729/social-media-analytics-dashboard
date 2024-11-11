import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PostsChart({ postsData }) {
    const chartData = {
        labels: postsData.map((_, index) => `Post ${index + 1}`),
        datasets: [
            {
                label: 'Likes',
                data: postsData.map((post) => parseInt(post.likes.replace('K', '')) * 1000),
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Comments',
                data: postsData.map((post) => parseInt(post.comments.replace('K', '')) * 1000),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
            {
                label: 'Reposts',
                data: postsData.map((post) => parseInt(post.reposts.replace('K', '')) * 1000),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return value / 1000 + 'K'; // Display in 'K' format
                    },
                },
            },
        },
    };

    return (
        <div>
            <h3>Post Engagement Chart</h3>
            <Bar data={chartData} options={options} />
        </div>
    );
}

export default PostsChart;
