import express, { NextFunction, Request, Response } from 'express';
import { createContact, deleteContact, editContact, fetchAllContacts, fetchSingleContact } from '../services/contact';
import { authenticateToken } from '../middleware/auth';

export const contactController = express.Router();

contactController.get("/", async (_req: Request, res: Response) => {
    try {
        res.json(fetchAllContacts());
    } catch (error) {
        console.log(error)
    }
})

contactController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        res.json(fetchSingleContact(Number(id)));
    } catch (error) {
        console.log(error)
    }
})

contactController.post("/create", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    try {
        res.json(createContact(req.body));
    } catch (error) {
        console.log(error)
    }
})

contactController.put("/edit/:id", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        res.json(editContact(Number(id), req.body));
    } catch (error) {
        console.log(error)
    }
})

contactController.delete("/delete/:id", authenticateToken, async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        res.json(deleteContact(Number(id)));
    } catch (error) {
        console.log(error)
    }
})