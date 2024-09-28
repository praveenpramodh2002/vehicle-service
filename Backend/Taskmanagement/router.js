const express = require('express');
const { getTasks, addTask, updateTask, deleteTask } = require('./controller');
const router = express.Router();

router.get('/task', getTasks);
router.post('/task', addTask);
router.put('/task/:id', updateTask);
router.delete('/task/:id', deleteTask);

module.exports = router;
