import { LoginPage } from '../pages/LoginPage';
import { users } from '../test_data/users';

export async function loginAs(page: any, userType: string = 'standard') {
    const loginPage = new LoginPage(page);

    const user = users.find(u => u.type === userType);

    if (!user) {
        throw new Error(`${userType} user not found`);
    }

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    return user;
}
