import{test,expect,Locator} from '@playwright/test';

test('simple dialog', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog', (dialog) => {
        console.log("Dialog type: " , dialog.type());
        expect(dialog.type()).toBe('alert');
        console.log("Dialog message: " + dialog.message());
        expect(dialog.message()).toBe('I am an alert box!');
        dialog.accept();
    });
    
    await page.locator('#alertBtn').click();
    await page.waitForTimeout(5000);

});

test('simple confirm dialog', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog', (dialog) => {
        console.log("Dialog type: " , dialog.type());
        expect(dialog.type()).toBe('confirm');
        console.log("Dialog message: " + dialog.message());
        expect(dialog.message()).toBe('Press a button!');
        dialog.accept();
    });

    await page.locator('#confirmBtn').click();

    const resultText = await page.locator('#demo').textContent();
    console.log("Result text: " + resultText);
    expect(resultText).toBe('You pressed OK!');
    await page.waitForTimeout(5000);

});

test('simple prompt dialog', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog', (dialog) => {
        console.log("Dialog type: " , dialog.type());
        expect(dialog.type()).toBe('prompt');
        console.log("Dialog message: " + dialog.message());
        expect(dialog.message()).toBe('Please enter your name:');
        dialog.accept('Playwright');
    });

    await page.locator('#promptBtn').click();

    const resultText = await page.locator('#demo').textContent();
    console.log("Result text: " + resultText);
    expect(resultText).toBe('Hello Playwright! How are you today?');
    await page.waitForTimeout(6000);

});