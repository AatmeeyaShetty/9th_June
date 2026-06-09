import { Page, Locator, expect } from '@playwright/test'; 
 
export class CheckoutPage { 
  readonly page: Page; 
  readonly firstNameInput: Locator; 
  readonly lastNameInput: Locator; 
  readonly postalCodeInput: Locator; 
  readonly continueButton: Locator; 
  readonly errorMessage: Locator; 
  readonly finishButton: Locator; 
  readonly completeHeader: Locator; 

 
  constructor(page: Page) { 
    this.page = page; 
    this.firstNameInput = page.locator('[data-test="firstName"]'); 
    this.lastNameInput = page.locator('[data-test="lastName"]'); 
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]'); 
    this.finishButton = page.locator('[data-test="finish"]'); 
    this.completeHeader = page.locator('[data-test="complete-header"]'); 
    this.errorMessage = page.locator('[data-test="error"]'); 
  } 
 
  async fillCheckoutDetails(firstName:string,lastname:string,postalCode:string):Promise<void>{
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastname);
    await this.postalCodeInput.fill(postalCode);

  }
 
  async continueCheckout():Promise<void>{
    await this.continueButton.click();
  }
  async verifyValidationMessage(expectedMessage: string):Promise<void>{
    await expect (this.errorMessage).toContainText(expectedMessage);
  }
  async finishOrder():Promise<void>{
    await this.finishButton.click();
  }
   async verifyOrderConfirmation():Promise<void>{
    await expect (this.completeHeader).toBeVisible();
    await expect (this.completeHeader).toHaveText('Thank you for your order !');
   }
  }

