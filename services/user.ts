
import { AppError } from '../Class/AppError';
import { User, UserInterface } from '../interfaces/User';
import { compareHash, hashPassword } from '../util/bcryptUtil';
import { sqlQuery } from '../util/queries';


export const fetchAllUsers = async (): Promise<UserInterface[]> => {
    const users = await User.find();
    if (users === null) {
        throw new AppError({ status: 404, message: "Users not found" });
    }
    return users;
}

export const fetchSingleUser = async (id: any): Promise<UserInterface | null> => {
    const user = await User.findById(id);
    if (user === null) {
        throw new AppError({ status: 404, message: "User not found" });
    }
    return user;
}

export const createUser = async (data: UserInterface): Promise<UserInterface | null> => {

    let userExists = await User.find({ email: data.email });
    if (!userExists) {
        const hashedPassword: string = hashPassword(data.password);
        const newUser = await User.create({ ...data, password: hashedPassword })
        if (newUser === null) {
            throw new AppError({ status: 404, message: "User couldn't be created" });
        }
        return newUser;
    } else {
        throw new AppError({ status: 404, message: "User already exists" })
    }

}

export const editUser = async (id: any, data: UserInterface): Promise<UserInterface | null> => {
    const userExists = await User.findById(id);

    if (userExists === null) {
        throw new AppError({ status: 404, message: "User not found" });
    }

    if (userExists && !compareHash(data.password, userExists.password) && data.password != '') {
        const hashedPassword = hashPassword(data.password);
        return await User.findByIdAndUpdate(id, { ...data, password: hashedPassword }, { new: true });
    } else {
        return await User.findByIdAndUpdate(id, { ...data, password: userExists.password }, { new: true });
    }
}

export const deleteUser = async (id: any): Promise<UserInterface | null> => {
    const user = await User.findByIdAndDelete(id);
    if (user === null) {
        throw new AppError({ status: 404, message: "User not found" });
    }
    return user;
}