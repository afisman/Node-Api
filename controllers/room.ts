import express, { NextFunction, Request, Response } from 'express';
import { createRoom, deleteRoom, editRoom, fetchAllRooms, fetchSingleRoom } from '../services/room';
import { authenticateToken } from '../middleware/auth';

export const roomController = express.Router();

roomController.get("/", async (_req: Request, res: Response) => {
    res.json(fetchAllRooms());
})

roomController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    res.json(fetchSingleRoom(Number(id)));
})

roomController.use(authenticateToken);

roomController.post("/create", async (req: Request, res: Response, _next: NextFunction) => {
    res.json(createRoom(req.body));
})

roomController.put("/edit/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    res.json(editRoom(Number(id), req.body));
})

roomController.delete("/delete/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    res.json(deleteRoom(Number(id)));
})