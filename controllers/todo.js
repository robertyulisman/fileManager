import Todo from "../models/Todo.js";
import createError from "../utils/createError.js";

export const createTodo = async (req, res, next) => {
  // console.log("req.body", req.user);
  const newTodo = new Todo({
    title: req.body.title,
    description: req.body.description,
    user: req.user.id,
  });
  try {
    const savedTodo = await newTodo.save();
    return res.status(200).json(savedTodo);
  } catch (err) {
    console.log("err", err);
    return next(err);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.todoId).exec();
    if (!todo)
      return next(createError({ status: 404, message: "Todo not found" }));
    if (todo.user.toString() !== req.user.id)
      return next(createError({ status: 401, message: "It's not your todo." }));

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.todoId,
      {
        title: req.body.title,
        description: req.body.description,
      },
      { new: true }
    );
    return res.status(200).json(updatedTodo);
  } catch (err) {
    return next(err);
  }
};

export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({});
    return res.status(200).json(todos);
  } catch (err) {
    return next(err);
  }
};

export const getCurrentUserTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    return res.status(200).json(todos);
  } catch (err) {
    return next(err);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (todo.user === req.user.id) {
      return next(createError({ status: 401, message: "It's not your todo." }));
    }
    await Todo.findByIdAndDelete(req.params.todoId);
    return res.json("Todo Deleted Successfully");
  } catch (err) {
    return next(err);
  }
};

export const deleteAllTodos = async (req, res, next) => {
  try {
    await Todo.deleteMany({ user: req.user.id });
    return res.json("All Todo Deleted Successfully");
  } catch (err) {
    return next(err);
  }
};
