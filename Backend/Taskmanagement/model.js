const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  tId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  employee: { type: String },
  type: { type: String },
  date: { type: Date },
  status: { type: String },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
