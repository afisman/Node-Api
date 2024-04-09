
import { AppError } from '../class/AppError';
import { User, UserInterface } from '../interfaces/User';


const bcrypt = require('bcryptjs');

export const fetchAllUsers = async (): Promise<UserInterface[]> => {
    try {
        return await User.find();
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const fetchSingleUser = async (id: any): Promise<UserInterface | null> => {
    try {
        return await User.findById(id);
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const createUser = async (data: UserInterface): Promise<UserInterface> => {
    try {
        const rawPassword = data.password;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);

        const newUser = new User({ ...data, password: hashedPassword });
        return await newUser.save();
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }


}

export const editUser = async (id: any, data: UserInterface): Promise<UserInterface | null> => {
    try {
        return await User.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}

export const deleteUser = async (id: any): Promise<UserInterface | null> => {
    try {
        return await User.findByIdAndDelete(id);
    } catch (error) {
        throw new AppError({ status: 500, message: "internal server error" })
    }
}