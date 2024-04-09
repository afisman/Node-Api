import express, { NextFunction, Request, Response } from 'express';
import { createContact, deleteContact, editContact, fetchAllContacts, fetchSingleContact } from '../services/contact';
import { authenticateToken } from '../middleware/auth';

export const contactController = express.Router();

contactController.get("/", async (_req: Request, res: Response) => {
    try {
        const contacts = await fetchAllContacts()
        res.json(contacts);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

contactController.get("/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const singleContact = await fetchSingleContact(id)
        res.json(singleContact);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

contactController.post("/create", async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const newContact = await createContact(req.body)
        res.json(newContact);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

contactController.put("/edit/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const contactToEdit = await editContact(id, req.body)
        res.json(contactToEdit);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})

contactController.delete("/delete/:id", async (req: Request, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    try {
        const contactToDelete = deleteContact(id)
        res.json(contactToDelete);
    } catch (error) {
        console.error('An error ocurred', error);
        res.status(500).json({ error });
    }
})