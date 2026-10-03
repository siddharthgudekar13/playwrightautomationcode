import{Page,test,expect,Locator} from '@playwright/test';

import { SignupPage } from './Pages/signuppage';

test.describe('Facebook Signup Page', () => {
  let signupPage: SignupPage;
  test.beforeEach(async ({ page }) => {
    signupPage = new SignupPage(page);
  });


test.afterEach(async ({ page }) => {
  await page.close();
});

test('should sign up a new user', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  await page.waitForTimeout(5000);
  await signupPage.clickCreateAccountButton();
  await page.waitForTimeout(5000);
  await signupPage.enterFirstName('John');
  await page.waitForTimeout(5000);
  await signupPage.enterLastName('Doe');
  await page.waitForTimeout(5000);
  await signupPage.selectDay('15');
  await page.waitForTimeout(5000);
  await signupPage.selectMonth('6');
  await page.waitForTimeout(5000);
  await signupPage.selectYear('1990');
  await page.waitForTimeout(5000);
  await signupPage.selectGender('male');
  await page.waitForTimeout(5000);
  await signupPage.enterMobileNumber('1234567890');
  await page.waitForTimeout(5000);
  await signupPage.enterPassword('password123');
  await page.waitForTimeout(5000);
  await signupPage.clickSubmitButton(); 
  await page.waitForTimeout(5000);
})

});