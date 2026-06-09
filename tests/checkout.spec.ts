import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import{ ProductPage } from '../pages/ProductsPage';
import{CartPage} from '../pages/CartPage';
import { CheckoutPage} from '../pages/CheckoutPage';
import {users} from '../test_data/users';
import {products} from '../test_data/products';

test.describe("Checkout Tests", () => {
    test('TC_010 - Checkout with valid details @checkout @smoke.', async ({page}) =>{
        const loginPage = new LoginPage(page);
        const productsPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const standardUser = users.find(user =>user.type ==='standard');
        if (!standardUser){
            throw new Error('Standard user not found');
    }
        await loginPage.goto();
        await loginPage.login(standardUser.username,standardUser.password);
        await productsPage.addProductToCart(products[0].name);
        await expect(productsPage.cartBadge).toHaveText('1');
        await productsPage.goToCart();
        await cartPage.checkout();
        await checkoutPage.fillCheckoutDetails("Aatmeeya","Shetty","400054");
        await expect(productsPage.pageTitle).toContainText('Checkout');
});
test('TC_011 - Checkout with missing First Name. @checkout @negative', async ({page}) =>{
        const loginPage = new LoginPage(page);
        const productsPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const standardUser = users.find(user =>user.type ==='standard');
        if (!standardUser){
            throw new Error('Standard user not found');
    }
        await loginPage.goto();
        await loginPage.login(standardUser.username,standardUser.password);
        await productsPage.addProductToCart(products[0].name);
        await productsPage.goToCart();
        await cartPage.checkout();
        await page.locator('[data-test="lastName"]').fill("Shetty");
        await page.locator('[data-test="postalCode"]').fill("400054");
        await page.locator('[data-test="continue"]').click();
        await expect(page.locator('[data-test="error"]').first()).toContainText(/ First name is required/i);
    });
    test('TC_012 - Checkout with missing Postal code. @negative @checkout', async ({page}) =>{
        const loginPage = new LoginPage(page);
        const productsPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        const standardUser = users.find(user =>user.type ==='standard');
        if (!standardUser){
            throw new Error('Standard user not found');
    }
        await loginPage.goto();
        await loginPage.login(standardUser.username,standardUser.password);
        await productsPage.addProductToCart(products[0].name);
        await productsPage.goToCart();
        await cartPage.checkout();
        await page.locator('[data-test="firstName"]').fill("Aatmeeya");
        await page.locator('[data-test="lastName"]').fill("Shetty");
        await page.locator('[data-test="continue"]').click();
        const error = page.locator('[data-test ="error"]');
        await expect(error).toBeVisible();
        await expect(error).toContainText(/Postal Code is required/i);
    });
});
