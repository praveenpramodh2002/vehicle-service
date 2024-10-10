const express = require('express');
const { getInventory, addInventory, updateInventory, deleteInventory } = require('./controller');
const router = express.Router();

router.get('/inventory', getInventory);
router.post('/inventory', addInventory);
router.put('/inventory/:id', updateInventory);
router.delete('/inventory/:id', deleteInventory);

module.exports = router;
