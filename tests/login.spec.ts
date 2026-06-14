import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductsPage';
import { users } from '../test-data/users';
test.describe('Login Functionality', () => {
  test('TC_001 - Login page should load @smoke', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.goto();

        await expect(loginPage.usernameInput).toBeVisible();
        await expect(loginPage.passwordInput).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        await expect(page).toHaveTitle(/Swag Labs/);
    });

    test('TC_002 - Valid user should be able to login @smoke', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductPage(page);

        const standardUser = users.find(
            user => user.type === 'standard'
        );

        if (!standardUser) {
            throw new Error('Standard user not found');
        }

        await loginPage.goto();
        await loginPage.login(
            standardUser.username,
            standardUser.password
        );

        await expect(page).toHaveURL(/inventory/);
        await expect(productsPage.pageTitle).toBeVisible();
        await expect(productsPage.cartLink).toBeVisible();
    });

    test('TC_003 - Invalid password should throw error @negative', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const standardUser = users.find(
            user => user.type === 'standard'
        );

        if (!standardUser) {
            throw new Error('Standard user not found');
        }

        await loginPage.goto();
        await loginPage.login(
            standardUser.username,
            'wrong_password'
        );

        await expect(loginPage.errorMessage)
            .toContainText('Epic sadface');
    });

    test('TC_004 - Locked user should not be able to login @negative', async ({ page }) => {
        const loginPage = new LoginPage(page);

        const lockedUser = users.find(
            user => user.type === 'locked'
        );

        if (!lockedUser) {
            throw new Error('Locked user not found');
        }

        await loginPage.goto();
        await loginPage.login(
            lockedUser.username,
            lockedUser.password
        );

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage)
            .toContainText('locked out');
    });

});
