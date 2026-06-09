import { test, expect } from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import{ ProductPage } from '../pages/ProductsPage';
import{CartPage} from '../pages/CartPage';
import {users} from '../test_data/users';
import {products} from '../test_data/products';



async function login(page: any){
    const standardUser = users.find(user =>user.type ==='standard');
    await page.goto('https://www.saucedemo.com/');
    await page.getByPlaceholder('Username').fill(standardUser!.username);
    await page.getByPlaceholder('Password').fill(standardUser!.password);
    await page.getByRole('Button',{name: 'Login'}).click();
}
test.describe("Cart tests ",() =>{
    test('TC_006 - Add Product to cart @cart @smoke',async ({page}) =>{
        const loginPage = new LoginPage(page);
        const productsPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        const standardUser=users.find(user => user.type === 'standard');
        if(!standardUser){
            throw new Error('Standard user not found');
        }
        await loginPage.goto();
        await loginPage.login(standardUser.username,standardUser.password);
        await productsPage.addProductToCart(products[0].name);
        await productsPage.verifyCartCount(1);
    });


    test('TC_007 - Remove  Product to cart @cart @regression',async ({page}) =>{
        const loginPage = new LoginPage(page);
        const productsPage = new ProductPage(page);
        const standardUser=users.find(user => user.type === 'standard');
        if(!standardUser){
            throw new Error('Standard user not found');
        }
        await loginPage.goto();
        await loginPage.login(standardUser.username,standardUser.password);
        await productsPage.addProductToCart(products[0].name);
        await productsPage.removeProductFromCart(products[0].name);
        await productsPage.verifyCartCount(0);
    });
    test('TC_008 - Add Multiple Products @cart @regression',async ({page}) =>{
        const loginPage = new LoginPage(page);
        const productsPage = new ProductPage(page);
        const standardUser=users.find(user => user.type === 'standard');
        if(!standardUser){
            throw new Error('Standard user not found');
        }
        await loginPage.goto();
        await loginPage.login(standardUser.username,standardUser.password);
        await productsPage.addProductToCart(products[0].name);
        await productsPage.addProductToCart(products[1].name);
        await productsPage.verifyCartCount(2);
    });
    test('TC_009 - Verify product in the cart @cart @regression',async ({page}) =>{
        const loginPage = new LoginPage(page);
        const productsPage = new ProductPage(page);
        const standardUser=users.find(user => user.type === 'standard');
        if(!standardUser){
            throw new Error('Standard user not found');
        }
        await loginPage.goto();
        await loginPage.login(standardUser.username,standardUser.password);
        await productsPage.addProductToCart(products[0].name);
        await productsPage.goToCart();
        const cartPage = new CartPage(page);
        await cartPage.verifyProductInCart(products[0].name);
    });

    });