import express, { NextFunction, Request, Response } from 'express';
import { createContact, deleteContact, editContact, fetchAllContacts, fetchSingleContact } from '../services/contact';
import { authenticateToken } from '../middleware/auth';

export const contactController = express.Router();

contactController.get("/", async (_req: Request, res: Response) => {
    res.json(fetchAllContacts());
})

contactController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    res.json(fetchSingleContact(Number(id)));
})

contactController.use(authenticateToken);

contactController.post("/create", async (req: Request, res: Response, _next: NextFunction) => {
    res.json(createContact(req.body));
})

contactController.put("/edit/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    res.json(editContact(Number(id), req.body));
})

contactController.delete("/delete/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    res.json(deleteContact(Number(id)));
})