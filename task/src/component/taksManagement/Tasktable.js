import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Dropdown, Menu, Input, Button, Tooltip } from 'antd';
import { FilterOutlined, DownloadOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
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
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Task Report', 14, 22);

        doc.autoTable({
            startY: 30,
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
                                        icon={<EditOutlined />} // Using the edit icon
                                    />
                                    <Button
                                        className='deleteBtn'
                                        onClick={() => handleDeleteTask(row._id)}
                                        icon={<DeleteOutlined />} // Using the delete icon
                                    />
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
