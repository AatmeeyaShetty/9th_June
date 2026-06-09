import { Page, Locator, expect } from '@playwright/test'; 
 
export class CartPage { 
  readonly page: Page; 
  readonly continueShoppingButton: Locator; 
  readonly checkoutButton: Locator; 
  readonly cartItemName: Locator; 
  
 
  constructor(page: Page) { 
    this.page = page; 
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]'); 
    this.checkoutButton = page.locator('[data-test="checkout"]'); 
    this.cartItemName = page.locator('[data-test="inventory-item-name"]'); 
  }
  async goto(): Promise<void> { 
    await this.page.goto('https://www.saucedemo.com/'); 
  } 
 
  async verifyProductInCart(productName:string): Promise<void> { 
    const productLocator = this.cartItemName.filter({hasText:productName});
    await expect(productLocator).toBeVisible(); 
  } 
   async removeProduct(productName:string): Promise<void> { 
    const dynamicId =`remove-${productName.toLowerCase().replace(/\s=/g,"-")}`; 
    await this.page.locator('[data-test="${dynamicId}"]').click();
   }
   async continueShopping(): Promise<void>{
    await this.continueShoppingButton.click();


   }
 async checkout(): Promise<void>{
    await this.checkoutButton.click();


   }
}
  