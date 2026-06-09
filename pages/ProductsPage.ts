import { Page, Locator, expect } from '@playwright/test'; 
 
export class ProductPage { 
  readonly page: Page; 
  readonly pageTitle: Locator; 
  readonly cartLink: Locator; 
  readonly cartBadge: Locator; 
  
 
  constructor(page: Page) { 
    this.page = page; 
    this.pageTitle = page.locator('[data-test="title"]'); 
    this.cartLink = page.locator('[data-test="shopping-cart-link"]'); 
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]'); 
  }
  async goto(): Promise<void> { 
    await this.page.goto('https://www.saucedemo.com/'); 
  } 
 
  async verifyProductsPageIsVisible(): Promise<void> { 
    await expect(this.pageTitle).toBeVisible(); 
    await expect(this.cartLink).toBeVisible(); 

  } 
  async addProductToCart(productName: string): Promise<void> { 
    const dynamicId =`add-to-cart-${productName.toLowerCase().replace(/\s/g,"-")}`; 
    await this.page.locator(`[data-test ="${dynamicId}"]`).click(); 
  } 
  async removeProductFromCart(productName: string): Promise<void> { 
    const dynamicId =`remove-${productName.toLowerCase().replace(/\s/g,'-')}`; 
    await this.page.locator(`[data-test ="${dynamicId}"]`).click(); 
  } 
  async goToCart():Promise<void>{
    await this.cartLink.click();
  }
async verifyCartCount(expectedCount:number): Promise<void>{
    if(expectedCount===0){
        await expect(this.cartBadge).not.toBeVisible();
        
    }
    else{
        await expect (this.cartBadge).toHaveText(expectedCount.toString());
    }
}}
