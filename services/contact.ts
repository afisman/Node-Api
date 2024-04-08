
import { Contact, ContactInterface } from '../interfaces/Contact';


export const fetchAllContacts = async (): Promise<ContactInterface[]> => {
    return await Contact.find();
}

export const fetchSingleContact = async (id: number): Promise<ContactInterface | null> => {
    return Contact.findById(id);
}

export const createContact = async (data: ContactInterface): Promise<ContactInterface | null> => {
    const newContact = new Contact(data);
    return await newContact.save();


}

export const editContact = async (id: number, data: ContactInterface): Promise<ContactInterface | null> => {
    return await Contact.findByIdAndUpdate(id, data, { new: true });
}

export const deleteContact = async (id: number): Promise<ContactInterface | null> => {
    return await Contact.findByIdAndDelete(id).lean();
}


