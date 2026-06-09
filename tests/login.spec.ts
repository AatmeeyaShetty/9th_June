import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import{ ProductPage } from '../pages/ProductsPage';
import {users} from '../test_data/users';
test.describe("login Functionality",() =>{
    test('TC_001 - Login page should load @smoke',async({page}) =>{
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        await expect(page).toHaveTitle(/Swag Labs/);

    });
     test('TC_002 - Valid user should be able to login @smoke',async({page}) =>{
        const standardUser = users.find(user=> user.type==='standard');
        const loginPage = new LoginPage(page);
        const productsPage = new ProductPage(page);
        if (!standardUser){
            throw new Error('Standard user not found');
        }
        await page.goto('https://saucedemo.com');
        await page.locator('#user-name').fill('standard_user');
        await page.locator('#password').fill('secret_sauce');
        await page.locator('#login-button').click();
        await expect(page).toHaveURL(/inventory/);
        await expect(productsPage.pageTitle).toBeVisible();
        await expect(productsPage.cartLink).toBeVisible();
     });
     test('TC_003 - Invalid password should throw error @negative',async({page}) =>{
        const standardUser = users.find(user=> user.type==='standard');
        const loginPage = new LoginPage(page);
        const productsPage = new ProductPage(page);
        if (!standardUser){
            throw new Error('Standard user not found');
        }
        await loginPage.goto();
        await loginPage.usernameInput.fill(standardUser.username);
        await loginPage.passwordInput.fill('wrong_password');
        await loginPage.loginButton.click();
        await expect(loginPage.errorMessage).toContainText('Epic sadface');
     });

      test('TC_004 - Locked user should not be able to login @negative',async({page}) =>{
        const lockedUser = users.find(user=> user.type==='locked'); 
        const loginPage = new LoginPage(page);
        const productsPage = new ProductPage(page);
        if (!lockedUser){
            throw new Error('Locked user not found');
        }
        await loginPage.goto();
        await loginPage.login(lockedUser.username,lockedUser.password);
        await expect (loginPage.errorMessage).toBeVisible();
        await expect (loginPage.errorMessage).toContainText('locked out');
    });
});