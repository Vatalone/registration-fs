import express from 'express';
import { authUser } from '../middleware/auth-user.js';
import { getUsers, login, register } from '../controllers/userController.js';

export const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/all-users', getUsers)