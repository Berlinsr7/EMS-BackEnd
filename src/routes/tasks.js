import express from "express";
import TaskController from "../controllers/tasks.js";
import validate from "../middleware/validate.js";

const router = express.Router();

router.post('/', TaskController.create);
router.get('/', validate,TaskController.getAllTasks);
router.get('/:taskNo', validate,TaskController.getByTaskNo);
router.get('/progress/:progress', validate,TaskController.taskList);
router.delete('/:taskNo', validate,TaskController.deleteTask); 
router.patch('/:taskNo', validate,TaskController.changeProgress);

export default router