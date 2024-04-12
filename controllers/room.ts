import express, { NextFunction, Request, Response } from 'express';
import { createRoom, deleteRoom, editRoom, fetchAllRooms, fetchSingleRoom } from '../services/room';

export const roomController = express.Router();

roomController.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await fetchAllRooms()
        res.json(rooms);
    } catch (error) {
        next(error);
    }
})

roomController.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const singleRoom = await fetchSingleRoom(id)
        res.json(singleRoom);
    } catch (error) {
        next(error);
    }
})

roomController.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newRoom = await createRoom(req.body)
        res.json(newRoom);
    } catch (error) {
        next(error);
    }
})

roomController.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const roomToEdit = await editRoom(id, req.body)
        res.json(roomToEdit);
    } catch (error) {
        next(error);
    }
})

roomController.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const roomToDelete = await deleteRoom(id)
        res.json(roomToDelete);
    } catch (error) {
        next(error);
    }
})