const testUser = { username: 'afisman', password: '12345' };

export const login = async (userLogin: any): Promise<boolean> => {

    const { username = testUser.username, password = testUser.password } = userLogin
    if (username === 'afisman' && password === '12345') {
        return true
    }
    return false
}