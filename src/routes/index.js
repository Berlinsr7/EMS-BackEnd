import express from "express";
import IndexController from "../controllers/index.js"
import UserRoutes from "./users.js"
import TaskRoutes from "./tasks.js"
import TaskController from "../controllers/tasks.js"
import validate from "../middleware/validate.js";

let router = express.Router();

router.get('/', IndexController.index)
router.use('/users', UserRoutes)
router.use('/tasks', TaskRoutes)
router.get('/dashboardCount', validate,TaskController.dashboardCount);

export default router;