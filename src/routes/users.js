import express from "express";
import UserController from "../controllers/users.js"
import validate from "../middleware/validate.js";
import adminGuard from "../middleware/adminGuard.js";

let router = express.Router();

router.get('/', validate,adminGuard,UserController.getAllUsers);
router.post('/', validate,adminGuard,UserController.createUser);
router.delete('/:userId', validate,adminGuard,UserController.deleteUser);
router.get('/:userId', validate, UserController.getUserById);
router.post('/login', UserController.login);
router.patch('/:userId/tasks', validate,adminGuard,UserController.updateUserTasks);

export default router;