import { readJson, writeJson } from '../util/dataJson';
import { userfile } from '../util/fileNames';
import { User } from '../interfaces/User';

const userData = readJson(userfile) as User[];

export const fetchAllUsers = (): User[] => {
    return userData;
}

export const fetchSingleUser = (id: number): User => {
    const singleUser = userData.find(user => user.id === id) || {} as User;
    return singleUser;
}

export const createUser = (data: User): string => {
    const userExists = userData.findIndex(user => user.id === data.id);
    if (data !== undefined && userExists === -1) {
        userData.push(data);
        writeJson(userfile, userData);
        return "User created correctly";
    }

    return "Error creating User";
}

export const editUser = (id: number, data: User): string => {
    const userExists = userData.findIndex(user => user.id === id);
    if (data !== undefined && userExists !== -1) {
        userData[userExists] = { ...userData[userExists], ...data };
        writeJson(userfile, userData);
        return "User edited correctly";
    }

    return "Error editing User";
}

export const deleteUser = (id: number): string => {
    const userExists = userData.findIndex(user => user.id === id);
    if (userExists !== -1) {
        userData.splice(userExists, 1);
        writeJson(userfile, userData);
        return "User deleted correctly";
    }

    return "Error deleted User";
}