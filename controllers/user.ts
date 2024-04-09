import express, { NextFunction, Request, Response } from 'express';
import { createUser, deleteUser, editUser, fetchAllUsers, fetchSingleUser } from '../services/user';
import { authenticateToken } from '../middleware/auth';

export const userController = express.Router();

userController.get("/", async (_req: Request, res: Response) => {
    try {
        const users = await fetchAllUsers()
        res.json(users);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

userController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const singleUser = await fetchSingleUser(id)
        res.json(singleUser);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})


userController.post("/create", async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const newUser = await createUser(req.body)
        res.json(newUser);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

userController.put("/edit/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const userToEdit = await editUser(id, req.body)
        res.json(userToEdit);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

userController.delete("/delete/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const userToDelete = await deleteUser(id)
        res.json(userToDelete);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})