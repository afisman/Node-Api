
import { AppError } from '../Class/AppError';
import { Contact, ContactInterface } from '../interfaces/Contact';
import { sqlQuery } from '../util/queries';

export const fetchAllContacts = async (): Promise<ContactInterface[]> => {
    const contacts = await Contact.find();
    if (contacts === null) {
        throw new AppError({ status: 404, message: "Contacts not found" });
    }
    return contacts;
}

export const fetchSingleContact = async (id: any): Promise<ContactInterface | null> => {

    const contact = await Contact.findById(id);
    if (contact === null) {
        throw new AppError({ status: 404, message: "Contact not found" });
    }
    return contact;
}

export const createContact = async (data: ContactInterface): Promise<ContactInterface | null> => {
    const contact = await Contact.create(data);
    if (contact === null) {
        throw new AppError({ status: 404, message: "Contact couldn't be created" });
    }
    return contact;
}

export const editContact = async (id: any, data: ContactInterface): Promise<ContactInterface | null> => {
    const contact = await Contact.findByIdAndUpdate(id, data, { new: true });
    if (contact === null) {
        throw new AppError({ status: 404, message: "Contact not found" });
    }
    return contact;
}

export const deleteContact = async (id: any): Promise<ContactInterface | null> => {
    const contact = await Contact.findByIdAndDelete(id);
    if (contact === null) {
        throw new AppError({ status: 404, message: "Contact couldn't be created" });
    }
    return contact;
}


