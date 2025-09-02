import express from 'express';
import UserController from "./user.controller.js";

const userController = new UserController();

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.get('/all', userController.getAll);

export default userRouter;