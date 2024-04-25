
import { AppError } from '../class/AppError';
import { User, UserInterface } from '../interfaces/User';
import { compareHash, hashPassword } from '../util/bcryptUtil';
import { sqlQuery } from '../util/queries';


export const fetchAllUsers = async (): Promise<UserInterface[]> => {
    const users = await sqlQuery(`
    SELECT * from employee;`);
    console.log(users);
    return users

    // const users = await User.find();
    // if (users === null) {
    //     throw new AppError({ status: 404, message: "Users not found" });
    // }
    // return users;
}

export const fetchSingleUser = async (id: any): Promise<UserInterface | null> => {
    const user = await sqlQuery(
        `SELECT * from employee
        WHERE _id = ${Number(id)};`
    );
    return user;
    // const user = await User.findById(id);
    // if (user === null) {
    //     throw new AppError({ status: 404, message: "User not found" });
    // }
    // return user;

}

export const createUser = async (data: UserInterface): Promise<UserInterface> => {
    const rawPassword = data.password;
    const hashedPassword: string = hashPassword(rawPassword);

    const user = await sqlQuery(`
    INSERT INTO employee 
            (full_name, contact, email, photo, start_date, description, status, position, password)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
        data.full_name,
        data.contact,
        data.email,
        data.photo,
        new Date(data.start_date).toISOString().slice(0, 19),
        data.description,
        data.status,
        data.position,
        hashedPassword
    ]);

    return user;

    // const newUser = await User.create({ ...data, password: hashedPassword })
    // if (newUser === null) {
    //     throw new AppError({ status: 404, message: "User couldn't be created" });
    // }
    // return newUser;
}

export const editUser = async (id: any, data: UserInterface): Promise<UserInterface | null> => {
    const userExists = await User.findById(id);

    if (userExists === null) {
        throw new AppError({ status: 404, message: "User not found" });
    }

    if (userExists && !compareHash(data.password, userExists.password) && data.password != '') {
        const hashedPassword = hashPassword(data.password)
        return await User.findByIdAndUpdate(id, { ...data, password: hashedPassword }, { new: true })
    } else {
        return await User.findByIdAndUpdate(id, { ...data, password: userExists.password }, { new: true });
    }
}

export const deleteUser = async (id: any): Promise<UserInterface | null> => {
    const deleteUser = await sqlQuery(
        `
        DELETE FROM employee
        WHERE _id = ?
        `,
        [id]
    );

    return deleteUser;

    // const user = await User.findByIdAndDelete(id);
    // if (user === null) {
    //     throw new AppError({ status: 404, message: "User not found" });
    // }
    // return user;
}