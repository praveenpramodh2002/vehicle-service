import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // Register Chart.js components

const AttendanceChart = ({ attendanceData }) => {
    // Prepare data for the chart
    const chartData = {
        labels: attendanceData.map(record => record.nic),
        datasets: [
            {
                label: 'Present',
                data: attendanceData.map(record => record.present || 0),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Absent',
                data: attendanceData.map(record => record.absent || 0),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Late',
                data: attendanceData.map(record => record.late || 0),
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div style={{ height: '400px', width: '100%' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default AttendanceChart;
