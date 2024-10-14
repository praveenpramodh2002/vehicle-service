import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";
import "./attendancesummary.css"; // Import the CSS file
import Sidebar from "../sidebar/sidebar.js"; // Import your Sidebar component

Chart.register(...registerables);

const AttendanceChart = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [summary, setSummary] = useState({ totalPresent: 0, totalAbsent: 0, totalLate: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/attendance/monthly"
        );
        
        // Debug: Check if the data is being fetched correctly
        console.log("Fetched attendance data:", response.data);

        const attendance = response.data;

        // Calculate the overall summary (total present, absent, late)
        const overallSummary = calculateSummary(attendance);
        
        setAttendanceData(attendance);
        setSummary(overallSummary);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setError("Failed to load attendance data.");
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  // Helper function to calculate the summary
  const calculateSummary = (data) => {
    let totalPresent = 0;
    let totalAbsent = 0;
    let totalLate = 0;

    data.forEach((record) => {
      totalPresent += record.present;
      totalAbsent += record.absent;
      totalLate += record.late;
    });

    return { totalPresent, totalAbsent, totalLate };
  };

  const chartData = {
    labels: attendanceData.map((record) => record.nic),
    datasets: [
      {
        label: "Total Present",
        data: attendanceData.map((record) => record.present),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Total Absent",
        data: attendanceData.map((record) => record.absent),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "Total Late",
        data: attendanceData.map((record) => record.late),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
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
    maintainAspectRatio: false, // Make the chart responsive
  };

  return (
    <div className="container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="chart-content">
        <h2>Attendance Report</h2>
        <div className="chart-wrapper">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <Bar data={chartData} options={options} />
              <div className="summary">
                <h3>Overall Summary</h3>
                <p>Total Present: {summary.totalPresent}</p>
                <p>Total Absent: {summary.totalAbsent}</p>
                <p>Total Late: {summary.totalLate}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;
