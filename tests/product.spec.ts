import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import{ ProductPage } from '../pages/ProductsPage';
import {users} from '../test_data/users'

test.describe("Product  Functionality ",() =>{

    test('TC_005 - Product list should be visible after login @smoke',async ({page}) =>{
        const loginPage = new LoginPage(page);
        const productsPage = new ProductPage(page);
        const standardUser = users.find(user => user.type ==="standard");
        if (!standardUser){
            throw new Error('Standard user not found');
        }
        await loginPage.goto();
        await loginPage.login(standardUser.username,standardUser.password);
    
    });
});