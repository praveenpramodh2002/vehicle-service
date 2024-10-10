const Task = require('./model');
const twilio = require('twilio');

// Twilio configuration
const accountSid = 'ACa22c5d28a8261851ac66f0084e510c2f';  // Replace with your Twilio Account SID
const authToken = '77547315909a02d15de880783741b965';    // Replace with your Twilio Auth Token
const client = new twilio(accountSid, authToken);
const whatsappFrom = `whatsapp:+14155238886`; // Replace with your Twilio WhatsApp number

// Get all tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ response: tasks });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};

// Add a new task
const addTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    
// Send WhatsApp notification after the task is added successfully
await client.messages.create({
  
  body: `🎉 A new task has been assigned!\n\n
  📝 *Title*: ${savedTask.title}\n\n
  📋 *Description*: ${savedTask.description}\n\n
  👨‍💼 *Assigned to*: ${savedTask.employee}\n\n
  Let's get to work and make progress! 🚀`,
  from: whatsappFrom,
  to: `whatsapp:+94714531805`
}).catch(err => console.error(`Failed to send WhatsApp message: ${err.message}`));

res.status(201).json({ message: 'Task added successfully, notification sent', response: savedTask });
} catch (error) {
  res.status(500).json({ message: 'Failed to add task', error: error.message });
}
}

// Update an existing task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated successfully', response: updatedTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully', response: deletedTask });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};
