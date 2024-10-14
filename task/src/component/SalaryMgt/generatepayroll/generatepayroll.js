import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from "../sidebar/sidebar";
import './generatepayroll.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GeneratePayroll = () => {
    const { nic } = useParams(); 
    const [payrollData, setPayrollData] = useState({
        nic: nic || '',
        basicSalary: '',
        hra: '',
        bonuses: '',
        transportAllowances: '',
        totalDeductions: '',
        incentives: '',
    });

    const [errors, setErrors] = useState({});
    const [paySheet, setPaySheet] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayrollData({ ...payrollData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!payrollData.nic) {
            newErrors.nic = 'NIC is required';
        }
        if (payrollData.basicSalary <= 0) {
            newErrors.basicSalary = 'Basic Salary must be a positive number';
        }
        if (payrollData.totalDeductions < 0) {
            newErrors.totalDeductions = 'Deductions cannot be negative';
        }
        if (payrollData.incentives < 0) {
            newErrors.incentives = 'Incentives cannot be negative';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const fetchBasicSalary = async () => {
        if (!payrollData.nic) {
            setErrors({ nic: 'NIC is required' });
            return;
        }
    
        try {
            const response = await axios.get(`http://localhost:5000/employees/nic/${payrollData.nic}`);
            if (response.data && response.data.employee) {
                const employeeData = response.data.employee;
                setPayrollData(prevData => ({
                    ...prevData,
                    basicSalary: employeeData.basic_salary || 0
                }));
                setErrors({});  // Clear errors if successful
            } else {
                alert('No data found for this NIC');
            }
        } catch (error) {
            console.error('Error fetching basic salary:', error);
            alert(error.response?.data?.message || 'Failed to fetch basic salary');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:5000/paysheet/generate', payrollData);
                console.log(response.data);  // Log the pay sheet data to check its contents
                
                // Calculate Gross Salary and Net Salary
                const grossSalary = (
                    parseFloat(payrollData.basicSalary || 0) +
                    parseFloat(payrollData.hra || 0) +
                    parseFloat(payrollData.transportAllowances || 0) +
                    parseFloat(payrollData.incentives || 0)
                ).toFixed(2);
    
                const totalDeductions = parseFloat(response.data.epfDeduction || 0) +
                                        parseFloat(response.data.etfDeduction || 0) +
                                        parseFloat(response.data.additionalDeductions || 0);
                                        
                const netSalary = (grossSalary - totalDeductions).toFixed(2);
    
                // Set pay sheet with calculated values
                setPaySheet({
                    ...response.data,
                    grossSalary,
                    netSalary
                });
                alert('Pay sheet generated successfully');
            } catch (error) {
                console.error('Error generating pay sheet:', error);
                alert(error.response?.data?.message || 'Failed to generate pay sheet');
            }
        }
    };
    

    // Function to download the pay sheet as a PDF
    function downloadPDF(paysheetData) {
        const { 
            employee_name, position, department, nic, basicSalary, 
            epfDeduction, etfDeduction, additionalDeductions, 
            incentives, netSalary, generatedAt, hra, transportAllowance 
        } = paysheetData;
    
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Micro Service Center", 70, 20);
        doc.setFontSize(14);
        doc.text("Pay Sheet", 90, 30);
    
        // Employee details
        doc.setFontSize(11);
        doc.text(`Employee Name: ${employee_name || 'N/A'}`, 10, 40);
        doc.text(`Position: ${position || 'N/A'}`, 10, 50);
        doc.text(`Department: ${department || 'N/A'}`, 10, 60);
        doc.text(`NIC: ${nic || 'N/A'}`, 10, 70);
        doc.text(`Generated At: ${generatedAt ? new Date(generatedAt).toLocaleString() : 'N/A'}`, 10, 80);
    
        // Table content using AutoTable
        const tableData = [
            { description: "Basic Salary", earnings: basicSalary || 0, deductions: "" },
            { description: "House Rent Allowance (HRA)", earnings: hra || 0, deductions: "" },
            { description: "Transport Allowance", earnings: transportAllowance || 0, deductions: "" },
            { description: "Incentives", earnings: incentives || 0, deductions: "" },
            { description: "EPF Deduction (8%)", earnings: "", deductions: epfDeduction || 'N/A' },
            { description: "ETF Deduction (3%)", earnings: "", deductions: etfDeduction || 'N/A' },
            { description: "Additional Deductions", earnings: "", deductions: additionalDeductions || '0' },
        ];
    
        // Calculate Gross Salary
        const grossSalary = (
            parseFloat(basicSalary) + 
            parseFloat(hra || 0) + 
            parseFloat(transportAllowance || 0) + 
            parseFloat(incentives)
        ).toFixed(2);

        // Add Gross and Net Salary to the table
        tableData.push(
            { description: "Gross Salary", earnings: grossSalary, deductions: "" },
            { description: "Net Salary", earnings: netSalary || 'N/A', deductions: "" }
        );

        // Create the table
        doc.autoTable({
            head: [['Description', 'Earnings', 'Deductions']],
            body: tableData.map(item => [item.description, item.earnings, item.deductions]),
            startY: 100,
            margin: { top: 10 },
            theme: 'grid'
        });
        // Save the document as a PDF
        doc.save(`paysheet_${nic}.pdf`);
    }
    
    return (
        <div className="container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="payroll-container">
            <h2>Generate Pay Sheet</h2>
            <form onSubmit={handleSubmit}>
                {/* Positive Inputs */}
                <div className="positive-inputs">
                    
                    <div className="form-group">
                        <label>NIC</label>
                        <input
                            type="text"
                            name="nic"
                            value={payrollData.nic}
                            onChange={handleChange}
                            required
                        />
                        {errors.nic && <p className="error">{errors.nic}</p>}
                    </div>
                    
                    <button type="button" onClick={fetchBasicSalary}>Fetch Basic Salary</button>
                    <br />
                    <br/>
                    <h3>Income/Allowances</h3>
                    <div className="form-group">
                        <label>Basic Salary</label>
                        <input
                            type="number"
                            name="basicSalary"
                            value={payrollData.basicSalary}
                            onChange={handleChange}
                            required
                            readOnly
                        />
                        {errors.basicSalary && <p className="error">{errors.basicSalary}</p>}
                    </div>

                    <div className="form-group">
                        <label>House Rent Allowance (HRA)</label>
                        <input
                            type="number"
                            name="hra"
                            value={payrollData.hra}
                            onChange={handleChange}
                            min="0"
                        />
                        {errors.hra && <p className="error">{errors.hra}</p>}
                    </div>
                    {/**? 
                    <div className="form-group">
                        <label>Bonuses/Incentives</label>
                        <input
                            type="number"
                            name="bonuses"
                            value={payrollData.incentives}
                            onChange={handleChange}
                            min="0"
                        />
                        {errors.bonuses && <p className="error">{errors.bonuses}</p>}
                    </div>
                    */}
                    <div className="form-group">
                        <label>Transport Allowances</label>
                        <input
                            type="number"
                            name="transportAllowances"
                            value={payrollData.transportAllowances}
                            onChange={handleChange}
                            min="0"
                        />
                        {errors.transportAllowances && <p className="error">{errors.transportAllowances}</p>}
                    </div>
                    
                </div>

                {/* Deduction Inputs */}
                <div className="deduction-inputs">
                    <h3>Deductions</h3>
                    <div className="form-group">
                        <label>Additional Deductions</label>
                        <input
                            type="number"
                            name="totalDeductions"
                            value={payrollData.totalDeductions}
                            onChange={handleChange}
                            min="0"
                        />
                        {errors.totalDeductions && <p className="error">{errors.totalDeductions}</p>}
                    </div>

                    
                </div>

                <button type="submit">Generate Pay Sheet</button>
            </form>


            {paySheet && (
                <div className="pay-sheet">
                    <h3>Pay Sheet</h3>
                    {/* Employee Details Section */}
                    <div className="employee-details">
                        <p><strong>Employee Name:</strong> {paySheet.employee_name || 'N/A'}</p>
                        <p><strong>Position:</strong> {paySheet.position || 'N/A'}</p>
                        <p><strong>Department:</strong> {paySheet.department || 'N/A'}</p>
                        <p><strong>NIC:</strong> {paySheet.nic || 'N/A'}</p>
                    </div>
                    <table className="pay-sheet-table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Credit</th>
                                <th>Debit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Basic Salary</td>
                                <td className="credit">{paySheet.basicSalary || 'N/A'}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>House Rent Allowance (HRA)</td>
                                <td className="credit">{paySheet.hra || 0}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Transport Allowance</td>
                                <td className="credit">{paySheet.transportAllowances || 0}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Incentives</td>
                                <td className="credit">{paySheet.incentives || 0}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>EPF Deduction</td>
                                <td></td>
                                <td className="debit">{paySheet.epfDeduction || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>ETF Deduction</td>
                                <td></td>
                                <td className="debit">{paySheet.etfDeduction || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Additional Deductions</td>
                                <td></td>
                                <td className="debit">{paySheet.additionalDeductions || 0}</td>
                            </tr>
                            <tr>
                                <td>Total Deductions</td>
                                <td></td>
                                <td className="debit">{paySheet.totalDeductions || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Gross Salary</td>
                                <td className="credit">{paySheet.grossSalary || 'N/A'}</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Net Salary</td>
                                <td className="credit">{paySheet.netSalary || 'N/A'}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <p><strong>Generated At:</strong> {paySheet.generatedAt ? new Date(paySheet.generatedAt).toLocaleString() : 'Invalid Date'}</p>
                    <button className="button-download" onClick={() => downloadPDF(paySheet)}>Download as PDF</button>
                </div>
            )}



            </div>
        </div>
    );
};

export default GeneratePayroll;
