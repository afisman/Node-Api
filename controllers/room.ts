import express, { NextFunction, Request, Response } from 'express';
import { createRoom, deleteRoom, editRoom, fetchAllRooms, fetchSingleRoom } from '../services/room';
import { authenticateToken } from '../middleware/auth';

export const roomController = express.Router();

roomController.get("/", async (_req: Request, res: Response) => {
    try {
        const rooms = await fetchAllRooms()
        res.json(rooms);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

roomController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const singleRoom = await fetchSingleRoom(id)
        res.json(singleRoom);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

roomController.post("/create", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const newRoom = await createRoom(req.body)
        res.json(newRoom);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

roomController.put("/edit/:id", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const roomToEdit = await editRoom(id, req.body)
        res.json(roomToEdit);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

roomController.delete("/delete/:id", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const roomToDelete = await deleteRoom(id)
        res.json(roomToDelete);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})