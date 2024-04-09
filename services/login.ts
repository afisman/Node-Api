import { User, UserInterface } from "../interfaces/User";

const testUser = { username: 'afisman', password: '12345' };

const bcrypt = require('bcryptjs');


export const login = async (userLogin: any): Promise<boolean> => {

    const userCheck = await User.findOne({ email: userLogin.email });

    const isAuthenticated = true;



    const { username = testUser.username, password = testUser.password } = userLogin
    if (username === 'afisman' && password === '12345') {
        return true
    }
    return false
}