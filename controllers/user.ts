import express, { NextFunction, Request, Response } from 'express';
import { createUser, deleteUser, editUser, fetchAllUsers, fetchSingleUser } from '../services/user';
import { authenticateToken } from '../middleware/auth';

export const userController = express.Router();

userController.get("/", async (_req: Request, res: Response) => {
    try {
        res.json(fetchAllUsers());
    } catch (error) {
        console.log(error);
    }
})

userController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        res.json(fetchSingleUser(Number(id)));
    } catch (error) {
        console.log(error);
    }
})



userController.post("/create", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    try {
        res.json(createUser(req.body));
    } catch (error) {
        console.log(error);
    }
})

userController.put("/edit/:id", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        res.json(editUser(Number(id), req.body));
    } catch (error) {
        console.log(error);
    }
})

userController.delete("/delete/:id", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        res.json(deleteUser(Number(id)));
    } catch (error) {
        console.log(error);
    }
})