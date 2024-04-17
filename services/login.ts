import { User } from "../interfaces/User";


export const login = async (userLogin: any) => {
    return await User.findOne({ email: userLogin.email })
}