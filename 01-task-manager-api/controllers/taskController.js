const Task = require("../models/taskModel");
const asyncWrapper = require("../middleware/async");

const { createCustomError } = require("../utils/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const task = await Task.findOne({ _id: id });

  if (!task) {
    return next(createCustomError(`No task with id: ${id}`, 404));
  }

  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id: ${id}`, 404));
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const id = req.params.id;
  const task = await Task.findOneAndDelete({ _id: id });

  if (!task) {
    return next(createCustomError(`No task with id: ${id}`, 404));
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
