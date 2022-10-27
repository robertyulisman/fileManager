import express from "express";

import {
  createTodo,
  deleteAllTodos,
  deleteTodo,
  getAllTodos,
  getCurrentUserTodos,
  updateTodo,
} from "../controllers/todo.js";

const router = express.Router();

router.get("/all", getAllTodos);
router.post("/", createTodo);
router.put("/:todoId", updateTodo);
router.get("/myTodos", getCurrentUserTodos);
router.delete("/deleteAll", deleteAllTodos);
router.delete("/:todoId", deleteTodo);

export default router;
