import express from "express";
import {
  createTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  getCurrentUserTasks,
  getLabelTask,
  getTaskGroupingByLabel,
  updateTask,
} from "../controllers/task.js";

const router = express.Router();

router.get("/all", getAllTasks); // get all atask
router.get("/:todoId", getCurrentUserTasks); // get all task by id todos
router.get("/group_label/:todoId", getTaskGroupingByLabel);
router.get("/label/:todoId", getLabelTask); // get all label of task
router.post("/:todoId", createTask); // create task
router.put("/:taskId", updateTask);
router.delete("/deleteAll", deleteAllTasks);
router.delete("/:taskId", deleteTask);

export default router;
