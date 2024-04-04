import express, { NextFunction, Request, Response } from 'express';
import { createRoom, deleteRoom, editRoom, fetchAllRooms, fetchSingleRoom } from '../services/room';
import { authenticateToken } from '../middleware/auth';

export const roomController = express.Router();

roomController.get("/", async (_req: Request, res: Response) => {
    try {
        res.json(fetchAllRooms());
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

roomController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        res.json(fetchSingleRoom(Number(id)));
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

roomController.post("/create", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    try {
        res.json(createRoom(req.body));
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

roomController.put("/edit/:id", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        res.json(editRoom(Number(id), req.body));
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

roomController.delete("/delete/:id", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        res.json(deleteRoom(Number(id)));
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})