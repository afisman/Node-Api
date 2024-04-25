
import { AppError } from '../class/AppError';
import { Contact, ContactInterface } from '../interfaces/Contact';
import { sqlQuery } from '../util/queries';

export const fetchAllContacts = async (): Promise<ContactInterface[]> => {
    // const contacts = await Contact.find();
    // if (contacts === null) {
    //     throw new AppError({ status: 404, message: "Contacts not found" });
    // }
    // return contacts;
    const contacts = await sqlQuery(`
    SELECT * from contact;`);
    console.log(contacts);
    return contacts
}

export const fetchSingleContact = async (id: any): Promise<ContactInterface | null> => {
    const contact = await sqlQuery(`
    SELECT * from contact
    WHERE _id = ${Number(id)};
    `);
    console.log(contact)
    return contact;
    // const contact = await Contact.findById(id);
    // if (contact === null) {
    //     throw new AppError({ status: 404, message: "Contact not found" });
    // }
    // return contact;
}

export const createContact = async (data: ContactInterface): Promise<ContactInterface | null> => {
    const contact = await sqlQuery(`
    INSERT INTO contact 
            (image, full_name, email, phone, date, message, rating, is_read)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        data.image,
        data.full_name,
        data.email,
        data.phone,
        new Date(data.date).toISOString().slice(0, 19),
        data.message,
        Number(data.rating),
        Boolean(data.is_read)
    ]);
    console.log(contact);
    return contact;
    // const contact = await Contact.create(data);
    // if (contact === null) {
    //     throw new AppError({ status: 404, message: "Contact couldn't be created" });
    // }
    // return contact;
}

export const editContact = async (id: any, data: ContactInterface): Promise<ContactInterface | null> => {
    // const contact = await Contact.findByIdAndUpdate(id, data, { new: true });
    // if (contact === null) {
    //     throw new AppError({ status: 404, message: "Contact not found" });
    // }
    // return contact;

    const keys: string[] = Object.keys(data);
    const values: string[] = Object.values(data);

    const updateColumn = keys.map((key: string) => `${key} = ?`).join(", ");

    const updateContact = await sqlQuery(`
    UPDATE contact
    set ${updateColumn}
    WHERE _id = ?
    `,
        [...values, id]);

    console.log(updateContact);

    return updateContact.affectedRows !== 0 ? updateContact : null;
}

export const deleteContact = async (id: any): Promise<ContactInterface | null> => {

    const deleteContact = await sqlQuery(
        `
        DELETE FROM contact
        WHERE _id=?`,
        [id]
    );

    console.log(deleteContact)

    return deleteContact.affectedRows !== 0 ? deleteContact : null;

    // const contact = await Contact.findByIdAndDelete(id);
    // if (contact === null) {
    //     throw new AppError({ status: 404, message: "Contact couldn't be created" });
    // }
    // return contact;
}


