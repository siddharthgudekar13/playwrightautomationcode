import{test,expect,Locator} from '@playwright/test';

//Xpath Demo in Playwright
test('XPath Demo in Playwright', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
  
  // Loop to click the button 5 times
  for (let i = 1; i <= 5; i++) {
   
    let button:Locator = page.locator('//button[text()="STOP" or text()="START"]'); // Locate the button with either 'STOP' or 'START' text
    // let button = await page.locator('//button[@name="start"]');
    //let button = await page.locator('//button[@name="start" or @name="stop"]');
    // let button = await page.locator('//button[contains(@name,"st")]');
    // let button = await page.locator('//button[starts-with(@name,"st")]');
    
    // Click the button
    await button.click();
    
    // Wait for 2 seconds
    await page.waitForTimeout(2000);

    console.log(`Clicked the button ${i} times`);
  }
})

test('Handle Dynamic Elements using using CSS locator', async ({ page }) => {
  // Navigate to the target page
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Loop to click the button 5 times
  for (let i = 1; i <= 5; i++) {
    // Locate the button using a CSS attribute selector (name can be 'start' or 'stop')
    const button1 = page.locator('button[name="start"], button[name="stop"]');

    // Click the button
    await button1.click();

    // Wait for 2 seconds
    await page.waitForTimeout(2000);
    console.log(`Clicked the button ${i} times`);
  }
});

test('Handle Dynamic Elements using using CSS locator with contains', async ({ page }) => {
  // Navigate to the target page
  await page.goto('https://testautomationpractice.blogspot.com/');

  for (let i = 1; i <= 5; i++) {

    const button2=page.getByRole('button', { name: /START|STOP/ });

    // Click the button
    await button2.click();
    // Wait for 2 seconds
    await page.waitForTimeout(2000);
    console.log(`Clicked the button ${i} times`);
    }
} );