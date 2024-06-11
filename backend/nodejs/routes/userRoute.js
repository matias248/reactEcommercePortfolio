import { Router } from "express";


export const createUserRouter = ({ UserController }) => {
    const userRouter = Router()
    const userController = new UserController();

    userRouter.post('/signup', userController.signup)
    userRouter.post('/login', userController.login)

    return userRouter;
}