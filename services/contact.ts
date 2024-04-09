
import { AppError } from '../class/Apperror';
import { Contact, ContactInterface } from '../interfaces/Contact';

export const fetchAllContacts = async (): Promise<ContactInterface[]> => {
    try {
        return await Contact.find();
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const fetchSingleContact = async (id: any): Promise<ContactInterface | null> => {
    try {
        return Contact.findById(id);
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const createContact = async (data: ContactInterface): Promise<ContactInterface | null> => {

    try {
        const newContact = new Contact(data);
        return await newContact.save();
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }


}

export const editContact = async (id: any, data: ContactInterface): Promise<ContactInterface | null> => {
    try {
        return await Contact.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const deleteContact = async (id: any): Promise<ContactInterface | null> => {
    try {
        return await Contact.findByIdAndDelete(id)
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}


