import { test } from '@playwright/test';
import { ProductPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { products } from '../test-data/products';
import { loginAs } from '../utils/testHelpers';
const [firstProduct, secondProduct] = products;
test.describe('Cart Tests', () => {
   test('TC_006 - Add Product to cart @cart @smoke', async ({ page }) => {
        const productsPage = new ProductPage(page);
        await loginAs(page);
        await productsPage.addProductToCart(firstProduct.name);
        await productsPage.verifyCartCount(1);
    });
    test('TC_007 - Remove Product from cart @cart @regression', async ({ page }) => {
        const productsPage = new ProductPage(page);
        await loginAs(page);
        await productsPage.addProductToCart(firstProduct.name);
        await productsPage.removeProductFromCart(firstProduct.name);
        await productsPage.verifyCartCount(0);
    });
    test('TC_008 - Add Multiple Products @cart @regression', async ({ page }) => {
        const productsPage = new ProductPage(page);
        await loginAs(page);
        await productsPage.addProductToCart(firstProduct.name);
        await productsPage.addProductToCart(secondProduct.name);
        await productsPage.verifyCartCount(2);
    });
    test('TC_009 - Verify product in cart @cart @regression', async ({ page }) => {
        const productsPage = new ProductPage(page);
        const cartPage = new CartPage(page);
        await loginAs(page);
        await productsPage.addProductToCart(firstProduct.name);
        await productsPage.goToCart();
        await cartPage.verifyProductInCart(firstProduct.name);
    });

});
