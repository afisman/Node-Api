
import { User, UserInterface } from '../interfaces/User';

const bcrypt = require('bcrypt');

export const fetchAllUsers = async (): Promise<UserInterface[]> => {
    return await User.find();
}

export const fetchSingleUser = async (id: any): Promise<UserInterface | null> => {
    return await User.findById(id);
}

export const createUser = async (data: UserInterface): Promise<UserInterface> => {
    const rawPassword = data.password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

    const newUser = new User({ ...data, password: hashedPassword });
    return await newUser.save();
}

export const editUser = async (id: any, data: UserInterface): Promise<UserInterface | null> => {
    return await User.findByIdAndUpdate(id, data, { new: true })
}

export const deleteUser = async (id: any): Promise<UserInterface | null> => {
    return await User.findByIdAndDelete(id).lean()
}