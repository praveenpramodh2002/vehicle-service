const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const managerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Manager", managerSchema);