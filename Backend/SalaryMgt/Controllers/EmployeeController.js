const mongoose = require('mongoose');
const Employee = require("../Model/EmployeeModel");
const DeletedEmployee = require("../Model/DeletedEmpModel");

const getAllEmployees = async (req, res, next) => {
    let employees;

    // Get all employees
    try {
        const employees = await Employee.find();
        if (employees.length === 0) {
            return res.status(404).json({ message: "No employees found" });
        }
        return res.status(200).json({ employees });
    } catch (err) {
        console.error("Error fetching employees:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const addEmployees = async (req, res, next) => {
    const { first_name, last_name, nic, dateofbirth, address, email,
        gender, position, department, basic_salary, working_hours, description, phone_no } = req.body

    let employees;

    try {
        employees = new Employee({
            first_name,
            last_name,
            nic,
            dateofbirth,
            address,
            email,
            gender,
            position,
            department,
            basic_salary,
            working_hours,
            description,
            phone_no
        });
        await employees.save();
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Error occurred while adding employee" });
    }

    if (!employees) {
        return res.status(404).send({ message: "Unable to add users" });
    }

    return res.status(200).json({ employees });
}

const getById = async (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
    }

    try {
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ employee });
    } catch (err) {
        console.error("Error fetching employee:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateEmployee = async (req, res, next) => {
    const id = req.params.id;
    const { first_name, last_name, nic, dateofbirth, address, email,
        gender, position, department, basic_salary, working_hours, description, phone_no } = req.body

    let employees;

    try {
        employees = await Employee.findByIdAndUpdate(id, {
            first_name,
            last_name,
            nic,
            dateofbirth,
            address,
            email,
            gender,
            position,
            department,
            basic_salary,
            working_hours,
            description,
            phone_no
        }, { new: true }); // Use { new: true } to return the updated document
    } catch (error) {
        console.error("Error updating employee:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

    if (!employees) {
        return res.status(404).send({ message: "Unable to update" });
    }

    return res.status(200).json({ employees });
}

const deleteEmployee = async (req, res, next) => {
    const id = req.params.id;

    let employee;

    try {
        // Find the employee by ID
        employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).send({ message: "Employee not found" });
        }

        // Save the employee details to DeletedEmployee before deleting
        const deletedEmployee = new DeletedEmployee({
            first_name: employee.first_name,
            last_name: employee.last_name,
            nic: employee.nic,
            dateofbirth: employee.dateofbirth,
            address: employee.address,
            email: employee.email,
            gender: employee.gender,
            position: employee.position,
            department: employee.department,
            basic_salary: employee.basic_salary,
            working_hours: employee.working_hours,
            phone_no: employee.phone_no, // Include phone_no in DeletedEmployee
            deletedAt: new Date(), // Record the deletion time
        });

        await deletedEmployee.save(); // Save to DeletedEmployee collection

        // Delete the employee from Employee collection
        await Employee.findByIdAndDelete(id);

    } catch (error) {
        console.log("Error deleting employee:", error);
        return res.status(500).send({ message: "Error occurred while deleting employee" });
    }

    return res.status(200).send({ message: "Employee deleted successfully" });
}

const getAllDeletedEmployees = async (req, res, next) => {
    try {
        const deletedEmployees = await DeletedEmployee.find();
        if (deletedEmployees.length === 0) {
            return res.status(404).json({ message: "No employees found" });
        }
        return res.status(200).json({ deletedEmployees });
    } catch (err) {
        console.error("Error fetching employees:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getByNIC = async (req, res, next) => {
    const { nic } = req.params;

    let employee;

    try {
        // Find the employee by NIC
        employee = await Employee.findOne({ nic });
    } catch (err) {
        console.error("Error fetching employee by NIC:", err);
        return res.status(500).send({ message: "Error occurred while fetching employee" });
    }

    if (!employee) {
        return res.status(404).send({ message: "Employee not found" });
    }

    return res.status(200).json({ employee });
}

const getEmployeeCount = async (req, res) => {
    try {
        const employeeCount = await Employee.countDocuments(); // Count total employees in the database
        res.status(200).json({ count: employeeCount });
    } catch (error) {
        console.error("Error fetching employee count:", error);
        res.status(500).json({ message: "Failed to fetch employee count" });
    }
};

exports.getAllEmployees = getAllEmployees;
exports.addEmployees = addEmployees;
exports.getById = getById;
exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
exports.getByNIC = getByNIC;
exports.getAllDeletedEmployees = getAllDeletedEmployees;
exports.getEmployeeCount = getEmployeeCount;
