import express, { NextFunction, Request, Response } from 'express';
import { createUser, deleteUser, editUser, fetchAllUsers, fetchSingleUser } from '../services/user';

export const userController = express.Router();

userController.get("/", async (_req: Request, res: Response) => {
    res.json(fetchAllUsers());
})

userController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    res.json(fetchSingleUser(Number(id)));
})

userController.post("/create", async (req: Request, res: Response, _next: NextFunction) => {
    res.json(createUser(req.body));
})

userController.put("/edit/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    res.json(editUser(Number(id), req.body));
})

userController.delete("/delete/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    res.json(deleteUser(Number(id)));
})