import React from 'react';
import { Pie } from 'react-chartjs-2';
import '../styles/YouTube.css';

function ChannelStatistics({ channelData, channelName }) {
    const channelChartData = {
        labels: ['Subscribers', 'Views', 'Videos'],
        datasets: [
            {
                label: `${channelName} Channel Statistics`,
                data: [
                    channelData?.channelStats?.subscriberCount || 0,
                    channelData?.channelStats?.viewCount || 0,
                    channelData?.channelStats?.videoCount || 0,
                ],
                backgroundColor: [
                    'rgba(50, 205, 50, 0.6)',   
                    'rgba(255, 165, 0, 0.6)',   
                    'rgba(0, 191, 255, 0.6)',   
                ],
                borderColor: [
                    'rgba(50, 205, 50, 1)',      
                    'rgba(255, 165, 0, 1)',      
                    'rgba(0, 191, 255, 1)',      
                ],
                borderWidth: 2,
            },
        ],
    };

    const formatNumber = (num) => {
        if (num >= 1e6) {
            return (num / 1e6).toFixed(1) + 'M'; 
        } else if (num >= 1e3) {
            return (num / 1e3).toFixed(1) + 'K'; 
        }
        return num; 
    };

    return (
        <div className="chart-container">
            <h2>Channel Statistics</h2>
            
            <div className="statistics-container">
                <p><strong>Total Subscribers:</strong> {formatNumber(channelData.channelStats?.subscriberCount || 0)}</p>
                <p><strong>Total Views:</strong> {formatNumber(channelData.channelStats?.viewCount || 0)}</p>
                <p><strong>Videos Count:</strong> {formatNumber(channelData.channelStats?.videoCount || 0)}</p>
            </div>

            <div className="chart">
                <Pie
                    data={channelChartData}
                    options={{
                        responsive: true,
                        plugins: {
                            legend: { display: true, position: 'top' },
                        },
                        radius: '70%',  // Adjust the radius to make the chart smaller
                        layout: {
                            padding: {
                                top: 10,
                                bottom: 10,
                                left: 10,
                                right: 10,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
}

export default ChannelStatistics;
