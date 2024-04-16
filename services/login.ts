import { User, UserInterface } from "../interfaces/User";
import { compareHash } from "../util/bcryptUtil";


export const login = async (userLogin: any) => {

    // const userCheck = await User.findOne({ email: userLogin.email });
    // let isAuthenticated = false

    // if (userCheck !== null) {
    //     isAuthenticated = compareHash(userLogin.password, userCheck.password)
    // }

    // return isAuthenticated

    return await User.findOne({ email: userLogin.email })
}