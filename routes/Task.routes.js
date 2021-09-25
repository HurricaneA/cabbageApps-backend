const taskController = require('../controllers/TaskController');
const express = require('express');
const router = express.Router();

router.get('/', taskController.getAllTasks);
router.post('/', taskController.addTask);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.removeTask);

module.exports = router;
