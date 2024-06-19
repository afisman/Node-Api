import { AppError } from "../Class/AppError";
import { User } from "../interfaces/User";
import { compareHash } from "../util/bcryptUtil";


export const login = async (userLogin: any) => {
    const user = await User.findOne({ email: userLogin.email })
    if (!user) {
        throw new AppError({ status: 404, message: 'User could not be found' })

    }
    const isAuth = compareHash(userLogin.password, user?.password)
    if (isAuth) {
        return user
    } else {
        throw new AppError({ status: 403, message: 'User is not authenticated' })
    }
}