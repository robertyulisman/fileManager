import Task from "../models/Task.js";
import createError from "../utils/createError.js";
import mongoose from "mongoose";

export const createTask = async (req, res, next) => {
  const newTask = new Task({
    title: req.body.title,
    user: req.user.id,
    todo: req.params.todoId,
    completed: req.body.completed,
    label: req.body.label,
  });
  try {
    const savedTask = await newTask.save();
    console.log("savedTask", savedTask);
    return res.status(200).json(savedTask);
  } catch (err) {
    console.log("err", err);
    return next(err);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId).exec();
    if (!task)
      return next(createError({ status: 404, message: "Task not found" }));
    if (task.user.toString() !== req.user.id)
      return next(createError({ status: 401, message: "It's not your todo." }));

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.taskId,
      {
        title: req.body.title,
        completed: req.body.completed,
        label: req.body.label,
      },
      { new: true }
    );
    return res.status(200).json(updatedTask);
  } catch (err) {
    return next(err);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
};

export const getLabelTask = async (req, res, next) => {
  console.log("req.params", req.params);
  try {
    const tasks = await Task.aggregate([
      {
        $match: { todo: mongoose.Types.ObjectId(req.params.todoId) },
      },
      {
        $unwind: "$label",
      },
      {
        $group: { _id: "$label" },
      },
      { $match: { _id: { $ne: "" } } },
    ]);
    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
};

export const getTaskGroupingByLabel = async (req, res, next) => {
  try {
    const task = await Task.aggregate([
      { $match: { todo: mongoose.Types.ObjectId(req.params.todoId) } },
      {
        $unwind: "$label",
      },
      {
        $group: {
          _id: "$label",
          task: { $push: "$$ROOT" },
          totalTask: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(task);
  } catch (err) {
    return next(err);
  }
};

export const getCurrentUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ todo: req.params.todoId });
    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (task.user === req.user.id) {
      return next(createError({ status: 401, message: "It's not your todo." }));
    }
    await Task.findByIdAndDelete(req.params.taskId);
    return res.json("Task Deleted Successfully");
  } catch (err) {
    return next(err);
  }
};

export const deleteAllTasks = async (req, res, next) => {
  try {
    await Task.deleteMany({ user: req.user.id });
    return res.json("All Todo Deleted Successfully");
  } catch (err) {
    return next(err);
  }
};
