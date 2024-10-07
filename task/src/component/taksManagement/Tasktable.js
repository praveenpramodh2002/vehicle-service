import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Dropdown, Menu, Input, Button, Tooltip } from 'antd';
import { FilterOutlined, DownloadOutlined } from '@ant-design/icons';
import './Tasktable.css';


const Tasktable = ({ rows, onEditTask, onDeleteTask }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedField, setSelectedField] = useState('title');
    const [statusFilter, setStatusFilter] = useState('All');
    const [deletedTasks, setDeletedTasks] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state for the button

    // Filter rows based on search query and selected field
    const filteredRows = rows
        .filter(row => {
            const fieldValue = row[selectedField]?.toString().toLowerCase() || '';
            const firstWord = fieldValue.split(' ')[0];
            return firstWord.startsWith(searchQuery.toLowerCase());
        })
        .filter(row => {
            if (statusFilter === 'All') return true;
            return row.status === statusFilter;
        });

    const handlePrint = () => {
        setLoading(true); // Set loading to true when starting to generate the report

        // Calculate total, completed, and ongoing tasks
        const totalTasks = rows.length;
        const completedTasks = rows.filter(row => row.status === 'Completed').length;
        const ongoingTasks = rows.filter(row => row.status === 'In Progress').length;

        const doc = new jsPDF();

        // Add the company name with custom font size and color
        doc.setFontSize(24);
        doc.setTextColor(40, 114, 178);
        doc.text('Microservice Center', 14, 22);

        // Contact Information
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0); 
        const date = new Date().toLocaleDateString();
        doc.text(`Date: ${date}`, 160, 22);  // Date aligned to the right
        doc.text('72/A, Makumbura, Pannipitiya', 14, 30);
        doc.text('+94 112203203', 14, 36);
        doc.text('microservicecenter@gmail.com', 14, 42);

        // Add a line break under the header
        doc.setLineWidth(0.8);
        doc.line(14, 45, 196, 45);

        // Title for the report
        doc.setFontSize(18);
        doc.text('Task Report', 70, 60); // Adjust the text position as needed

        // Add total, completed, and ongoing tasks summary
        doc.setFontSize(12);
        doc.text(`Total Tasks: ${totalTasks}`, 14, 70);
        doc.text(`Completed Tasks: ${completedTasks}`, 14, 78);
        doc.text(`Ongoing Tasks: ${ongoingTasks}`, 14, 86);

        // Add table of tasks
        doc.autoTable({
            startY: 100, // Start after the summary
            head: [['TID', 'Title', 'Description', 'Employee', 'Type', 'Date', 'Status']],
            body: filteredRows.map(row => [
                row.tId,
                row.title,
                row.description,
                row.employee,
                row.type,
                row.date,
                row.status
            ]),
        });

        doc.save('tasks_report.pdf');
        setLoading(false); // Set loading to false after the report is saved
    };

    const handleDeleteTask = (taskId) => {
        const taskToDelete = rows.find(row => row._id === taskId);
        if (taskToDelete) {
            setDeletedTasks(prevDeletedTasks => [...prevDeletedTasks, taskToDelete]);
            onDeleteTask(taskId); // Notify parent to delete the task
        }
    };

    const menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => setSelectedField('title')}>Title</Menu.Item>
            <Menu.Item key="2" onClick={() => setSelectedField('description')}>Description</Menu.Item>
            <Menu.Item key="3" onClick={() => setSelectedField('employee')}>Employee</Menu.Item>
            <Menu.Item key="4" onClick={() => setSelectedField('status')}>Status</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="5">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Statuses</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                </select>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="table_container">
            <div className="TableHeader">
                <h2>Task List</h2>
                <div className="filter-box">
                    <Input
                        placeholder="Search here"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        name="search"
                    />
                    <Dropdown overlay={menu} trigger={['click']}>
                        <Button icon={<FilterOutlined />}>Filter</Button>
                    </Dropdown>
                </div>
                <Tooltip title="Download the task report as a PDF">
                    <Button 
                        className="btn" 
                        onClick={handlePrint} 
                        icon={<DownloadOutlined />} 
                        loading={loading} // Show loading indicator
                    >
                    Download Report
                    </Button>
                </Tooltip>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>TID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Employee</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredRows.length > 0 ? (
                        filteredRows.map(row => (
                            <tr key={row._id}>
                                <td>{row.tId}</td>
                                <td>{row.title}</td>
                                <td>{row.description}</td>
                                <td>{row.employee}</td>
                                <td>{row.type}</td>
                                <td>{row.date}</td>
                                <td>{row.status}</td>
                                <td>
                                    <Button
                                        className='updateBtn'
                                        onClick={() => onEditTask(row)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        className='deleteBtn'
                                        onClick={() => handleDeleteTask(row._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No data</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h2>Deleted Tasks</h2>
            <table>
                <thead>
                    <tr>
                        <th>TID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Employee</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {deletedTasks.length > 0 ? (
                        deletedTasks.map(row => (
                            <tr key={row._id}>
                                <td>{row.tId}</td>
                                <td>{row.title}</td>
                                <td>{row.description}</td>
                                <td>{row.employee}</td>
                                <td>{row.type}</td>
                                <td>{row.date}</td>
                                <td>{row.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No deleted tasks</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Tasktable;
