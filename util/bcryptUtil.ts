import bcrypt from 'bcryptjs';

export const hashPassword = (rawPassword: string): string => {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(rawPassword, saltRounds);
    return hashedPassword;
}

export const compareHash = (rawPassword: string, hashedPassword: string): boolean => {
    const isAuth = bcrypt.compareSync(rawPassword, hashedPassword);
    return isAuth;
}