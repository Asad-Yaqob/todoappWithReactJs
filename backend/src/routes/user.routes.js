import { Router } from 'express';
import verifyJwt from '../middlewares/auth.middleware.js'
import {
  isAuthenticated,
  loginUser,
  registerUser,
  logoutUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);
userRouter.route('/isAuthenticated').get(isAuthenticated);

// Secured routes
userRouter.route('/logout').patch(verifyJwt,logoutUser);

export default userRouter;