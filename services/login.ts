import { readJson } from "../helpers/dataJson";
import { userfile } from "../helpers/fileNames";
import { User } from "../interfaces/User";

const userData = readJson(userfile) as User[];


export const login = async (userLogin: any): Promise<boolean> => {

    const userExists = userData.findIndex(user => user.email === userLogin.email);
    if (userData[userExists].password === userLogin.password) {
        return true
    }
    return false


}