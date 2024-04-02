import { readJson, writeJson } from '../helpers/dataJson';
import { contactFile } from '../helpers/fileNames';
import { Contact } from '../interfaces/Contact';

const contactData = readJson(contactFile) as Contact[];

export const fetchAllContacts = (): Contact[] => {
    return contactData;
}

export const fetchSingleContact = (id: number): Contact => {
    const singleContact = contactData.find(contact => contact.id === id) || {} as Contact;
    return singleContact;
}

export const createContact = (data: Contact): string => {
    const contactExists = contactData.findIndex(contact => contact.id === data.id);
    if (data !== undefined && contactExists === -1) {
        contactData.push(data);
        writeJson(contactFile, contactData);
        return "Contact created correctly";
    }

    return "Error creating contact";
}

export const editContact = (id: number, data: Contact): string => {
    const contactExists = contactData.findIndex(contact => contact.id === id);
    if (data !== undefined && contactExists === -1) {
        contactData.splice(contactExists, 1, data);
        writeJson(contactFile, contactData);
        return "Contact edited correctly";
    }

    return "Error editing contact";
}

export const deleteContact = (id: number): string => {
    const contactExists = contactData.findIndex(contact => contact.id === id);
    if (contactExists === -1) {
        contactData.splice(contactExists, 1);
        writeJson(contactFile, contactData);
        return "Contact deleted correctly";
    }

    return "Error deleted contact";
}