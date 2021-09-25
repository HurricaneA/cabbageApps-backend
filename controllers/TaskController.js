const Task = require('../models/Task');

const getTasks = async (req, res) => {
  const order = req.query.order;

  let sortBy = {};

  if (order === 'asc' || null) {
    sortBy = { title: 'asc' };
  } else if (order === 'desc') {
    sortBy = { title: 'descending' };
  } else {
    sortBy = { createdAt: -1 };
  }

  try {
    const tasks = await Task.find().sort(sortBy);
    res.status(200).json({
      tasks: tasks,
    });
  } catch (error) {
    res.status(404).json({
      message: 'Something went wrong',
      error: error,
    });
  }
};

const addTask = async (req, res) => {
  let { title, completed, date } = req.body;

  if (!title || !date) {
    return res.json({
      status: 'Failed',
      message: 'Fields cannot be empty',
    });
  }

  const newTask = new Task({
    title,
    completed,
    date,
  });

  try {
    const addedTask = await newTask.save();
    res.status(200).json(addedTask);
    // status: 'Success',
    // message: 'Task successfully added',
  } catch (error) {
    res.status(404).json({
      message: 'Something went wrong',
      error: error,
    });
  }
};

const updateTask = async (req, res) => {
  const { title, completed, date } = req.body;
  console.log('received ', req.body);

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: title,
          completed: completed,
          date: date,
        },
      },
      { new: true }
    );
    console.log('updated to', updatedTask);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(404).json({
      message: 'Something went wrong',
      error: error,
    });
  }
};

const removeTask = async (req, res) => {
  const taskId = req.params.id;

  try {
    const removedTask = await Task.findOneAndDelete({ _id: taskId });
    res.status(200).json(removedTask);
  } catch (error) {
    res.status(404).json({
      message: 'Something went wrong',
      status: 'Failed',
      error: error,
    });
  }
};

module.exports = {
  getAllTasks: getTasks,
  addTask: addTask,
  updateTask: updateTask,
  removeTask: removeTask,
};
