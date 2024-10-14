const Attendance = require('../Model/AttendanceModel');
const csv = require('csv-parser');
const fs = require('fs');

// Upload Attendance Data
exports.uploadAttendance = async (req, res) => {
    try {
        const attendanceFile = req.file;
        if (!attendanceFile) return res.status(400).json({ message: 'No file uploaded' });

        const results = await new Promise((resolve, reject) => {
            const rows = [];
            fs.createReadStream(attendanceFile.path)
                .pipe(csv())
                .on('data', (row) => {
                    console.log('Parsed Row:', row);
                    const attendanceRecord = {
                        nic: row.NIC,
                        arrivedTime: row['Arrived Time'],
                        departedTime: row['Departed Time'],
                        date: new Date(row.Date), // Handle date formatting if necessary
                        status: row['Attendance Status'],
                    };
                    if (attendanceRecord.nic) {
                        rows.push(attendanceRecord);
                    } else {
                        console.error('Missing NIC in row:', row);
                    }
                })
                .on('end', () => resolve(rows))
                .on('error', (error) => reject(error));
        });

        console.log('Results to insert:', results);

        if (results.length > 0) {
            await Attendance.insertMany(results);
            res.status(200).json({ message: 'Attendance data uploaded successfully' });
        } else {
            res.status(400).json({ message: 'No valid records to upload' });
        }
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ message: 'Error processing file', error });
    }
};


// Get Attendance Summary
exports.getAttendanceSummary = async (req, res) => {
    try {
        // Aggregate attendance data
        const summary = await Attendance.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Transform summary into a more usable format
        const formattedSummary = summary.reduce((acc, curr) => {
            acc[curr._id] = curr.count; // { Present: x, Absent: y, Late: z }
            return acc;
        }, {});

        res.status(200).json(formattedSummary);
    } catch (error) {
        console.error('Error fetching attendance summary:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAttendanceMonthly = async (req, res) => {
    try {
        // Fetch attendance data for the month
        const monthlyData = await Attendance.find(); // Customize the query as needed
        const summary = {
            totalPresent: monthlyData.filter(record => record.status === 'Present').length,
            totalAbsent: monthlyData.filter(record => record.status === 'Absent').length,
            totalLate: monthlyData.filter(record => record.status === 'Late').length,
        };
        
        res.status(200).json({ attendance: monthlyData, summary });
    } catch (error) {
        console.error('Error fetching monthly attendance:', error);
        res.status(500).json({ message: 'Error fetching attendance data' });
    }
};