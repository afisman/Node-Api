import express, { NextFunction, Request, Response } from 'express';
import { createContact, deleteContact, editContact, fetchAllContacts, fetchSingleContact } from '../services/contact';
import { validateContact } from '../validators/contactValidator';

export const contactController = express.Router();

contactController.get("/", async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const contacts = await fetchAllContacts()
        res.json(contacts);
    } catch (error) {
        next(error);
    }
})

contactController.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const singleContact = await fetchSingleContact(id)
        res.json(singleContact);
    } catch (error) {
        next(error);
    }
})

contactController.post("/", validateContact, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newContact = await createContact(req.body)
        res.json(newContact);
    } catch (error) {
        next(error);
    }
})

contactController.put("/:id", validateContact, async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const contactToEdit = await editContact(id, req.body)
        res.json(contactToEdit);
    } catch (error) {
        next(error);
    }
})

contactController.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const contactToDelete = await deleteContact(id)
        res.json(contactToDelete);
    } catch (error) {
        next(error);
    }
})