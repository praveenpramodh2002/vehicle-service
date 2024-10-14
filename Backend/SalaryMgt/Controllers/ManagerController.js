const Manager = require("../Model/ManagerModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const addManagers = async (req,res,next)=>{
    const {name,nic,email,username,password,position} = req.body

    let managers;
        
    try {
        managers = new Manager ({
            name,
            nic,
            email,
            username,
            password,
            position});
        await managers.save();
    } catch (err) {
        console.log(err);
    }

    if (!managers){
        return res.status(404).send({message:"Unable to add users"});
    }

    return res.status(200).json({managers});

}

const getManagerById = async(req, res, next) => {
    const id = req.params.id;

    let manager;

    try {
        manager = await Manager.findById(id);
    } catch (err) {
        console.log(err);
    }

    if (!manager){
        return res.status(404).send({message:"Employee not found"});
    }

    return res.status(200).json({manager});

}

const deleteManager = async (req,res,next)=>{
    const id = req.params.id;

    let manager;

    try {
        manager = await Manager.findByIdAndDelete(id)
    } catch (error) {
        console.log(err);
    }
    if (!manager){
        return res.status(404).send({message:"Unable to delete"});
    }

    return res.status(200).json({manager});
    
}

const getAllManagers = async (req,res,next)=>{

    let managers;

    //get all employees
    try {
        const managers = await Manager.find();
        if (managers.length === 0) {
            return res.status(404).json({ message: "No managers found" });
        }
        return res.status(200).json({ managers });
    } catch (err) {
        console.error("Error fetching managers:", err);
        return res.status(500).json({ message: "Internal server error" });
    }

    //not found
    if(!managers){
        return res.status(404).json({message:"Manager not available"})
    }

}

let otpStore = {};

const sendOTP = async (email) => {
    const otp = crypto.randomInt(100000, 999999).toString();
    otpStore[email] = otp; // Store the OTP temporarily

    // Configure your email transport (using nodemailer)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password', // Replace with your email password
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};

const loginManager = async (req, res, next) => {
    const { username, password } = req.body;

    let existingManager;

    try {
        existingManager = await Manager.findOne({ username: username });
    } catch (err) {
        return res.status(500).json({ message: "Login failed, please try again later." });
    }

    if (!existingManager || existingManager.password !== password) {
        return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Send OTP to the manager's email
    try {
        await sendOTP(existingManager.email);
        return res.status(200).json({ message: "OTP sent to your email. Please enter the OTP to continue.", email: existingManager.email });
    } catch (err) {
        return res.status(500).json({ message: "Failed to send OTP. Please try again." });
    }
};

const verifyOTP = async (req, res, next) => {
    const { email, otp } = req.body;

    if (otpStore[email] === otp) {
        delete otpStore[email]; // Clear the OTP after verification
        return res.status(200).json({ message: "Login successful!" });
    } else {
        return res.status(400).json({ message: "Invalid OTP!" });
    }
};

exports.loginManager = loginManager;
exports.verifyOTP = verifyOTP;
exports.addManagers = addManagers;
exports.getManagerById = getManagerById;
exports.deleteManager = deleteManager;
exports.getAllManagers = getAllManagers;