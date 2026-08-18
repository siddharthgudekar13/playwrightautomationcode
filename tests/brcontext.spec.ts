import{test,expect,Locator,chromium,webkit} from '@playwright/test';

test('Browser context demo',async ()=> {

    const browesr=await chromium.launch();

    const context=await browesr.newContext();

    const page1=await context.newPage();

    const page2=await context.newPage();
    console.log("No of pages created:",context.pages().length); //2

    await page1.goto("https://playwright.dev/");
    await expect(page1).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright")

    await page2.goto("https://www.selenium.dev/");
    await expect(page2).toHaveTitle("Selenium");

    await page1.waitForTimeout(5000);
    await page2.waitForTimeout(5000);







})
