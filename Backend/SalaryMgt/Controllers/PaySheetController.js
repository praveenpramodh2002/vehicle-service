// PaySheetController.js

const PaySheet = require('../Model/PaySheetModel');
const Employee = require('../Model/EmployeeModel'); // Assuming Employee model is in the models folder

// Generate and save a paysheet
const generatePaySheet = async (req, res) => {
    const { nic, hra, bonuses, transportAllowances, totalDeductions, incentives } = req.body;

    try {
        // Fetch employee by NIC
        const employee = await Employee.findOne({ nic });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        const basicSalary = employee.basic_salary;

        // Convert input values to numbers
        const parsedHRA = parseFloat(hra) || 0;
        const parsedBonuses = parseFloat(bonuses) || 0;
        const parsedTransportAllowances = parseFloat(transportAllowances) || 0;
        const additionalDeductions = parseFloat(totalDeductions) || 0;
        const parsedIncentives = parseFloat(incentives) || 0;

        // Calculate deductions
        const epfDeduction = (basicSalary * 8) / 100; // EPF is 8% of basic salary
        const etfDeduction = (basicSalary * 3) / 100; // ETF is 3% of basic salary
        const totalCalculatedDeductions = epfDeduction + etfDeduction + additionalDeductions;

        // Calculate net salary
        const netSalary = basicSalary + parsedHRA + parsedBonuses + parsedTransportAllowances - totalCalculatedDeductions + parsedIncentives;

        // Create pay sheet object including employee details
        const paySheet = {
            employee_name: employee.first_name+" "+employee.last_name, // Assuming employee object has a name field
            position: employee.position, // Assuming employee object has a position field
            department: employee.department, // Assuming employee object has a department field
            nic: employee.nic, // Include NIC
            basicSalary: basicSalary,
            hra: parsedHRA,
            bonuses: parsedBonuses,
            transportAllowances: parsedTransportAllowances,
            epfDeduction: epfDeduction,
            etfDeduction: etfDeduction,
            additionalDeductions: additionalDeductions,
            incentives: parsedIncentives,
            totalDeductions: totalCalculatedDeductions,
            netSalary: netSalary,
            generatedAt: new Date().toLocaleString(),
        };

        res.status(200).json(paySheet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error generating paysheet" });
    }
};


  



// Get paysheet by NIC (for viewing specific employee's paysheet)
const getPaySheetByNIC = async (req, res) => {
    const { nic } = req.params;

    try {
        const paySheet = await PaySheet.findOne({ nic });

        if (!paySheet) {
            return res.status(404).json({ message: 'Paysheet not found' });
        }

        res.status(200).json(paySheet);
    } catch (error) {
        console.error('Error fetching paysheet:', error);
        res.status(500).json({ message: 'Error fetching paysheet' });
    }
};

module.exports = {
    generatePaySheet,
    getPaySheetByNIC,
};
