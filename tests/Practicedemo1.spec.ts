import{test,expect,Locator} from '@playwright/test';

test('Check if the input box is displayed',async({ page }) => {
await page.goto('https://www.way2automation.com/automationpracticesite1.html');
await page.getByRole('button', { name: 'Start Practicing Elements' }).click();
const inputBox:Locator = page.locator('#full-name');
await expect(inputBox).toBeVisible();
await expect(inputBox).toBeEnabled();
await inputBox.fill('Ayush');
await expect(inputBox).toHaveValue('Ayush');
await page.waitForTimeout(5000);    


});

test('check validate if its a mandatory field',async({ page }) => {
    await page.goto('https://www.way2automation.com/automationpracticesite1.html');
    await page.getByRole('button', { name: 'Start Practicing Elements' }).click();
    const inputBox:Locator = page.locator('#full-name');
    await expect(inputBox).toBeVisible();
    await expect(inputBox).toBeEnabled();
    await inputBox.fill('');
    await expect(inputBox).toHaveValue('');
    await page.waitForTimeout(5000);
});

test('verify the placeholder text',async({ page}) =>{
    await page.goto('https://www.way2automation.com/automationpracticesite1.html');
    await page.getByRole('button', { name: 'Start Practicing Elements' }).click();
    const inputBox:Locator = page.locator('#full-name');
    await expect(inputBox).toBeVisible();
    await expect(inputBox).toBeEnabled();
    const text = await inputBox.fill('Ayush');
    await expect(inputBox).toHaveValue('Ayush');
    console.log('Entered text is: ' + text);
    const enteredText = await inputBox.inputValue();
    console.log('Entered text is: ' + enteredText);
    const placeholderText = await inputBox.getAttribute('placeholder');
    console.log('Placeholder text is: ' + placeholderText);
    expect(placeholderText).toBe('Enter your name');
    await page.waitForTimeout(5000);


});

test('Retrieve the value from the input box',async({ page}) =>{
    await page.goto('https://www.way2automation.com/automationpracticesite1.html');
    await page.getByRole('button', { name: 'Start Practicing Elements' }).click();
    const inputBox:Locator = page.locator('#full-name');
    await expect(inputBox).toBeVisible();
    await expect(inputBox).toBeEnabled();
    await inputBox.fill('Amar');
    const enteredText = await inputBox.inputValue();
    console.log('Entered text is: ' + enteredText); 
     await page.waitForTimeout(5000);

});

test('Radio button and checkbox validation',async({ page}) =>{
    await page.goto('https://www.way2automation.com/automationpracticesite1.html');
    await page.getByRole('button', { name: 'Start Practicing Elements' }).click();
    const radioBtn:Locator = page.locator("input[value='female']");
    await radioBtn.check();
    console.log('Is female radio button selected: ' + await radioBtn.isChecked());
    await expect(radioBtn).toBeChecked();
    await page.waitForTimeout(5000);
    const radioBtn1:Locator = page.locator("input[value='male']");
    await radioBtn1.check();
    console.log('Is male radio button selected: ' + await radioBtn1.isChecked());
    //await expect(radioBtn).toBeChecked();
    await page.waitForTimeout(5000);
    
});

test('Select the checkbox for reading',async ({ page}) =>{
    await page.goto('https://www.way2automation.com/automationpracticesite1.html');
    await page.getByRole('button', { name: 'Start Practicing Elements' }).click();
    const checkbox1:Locator=page.locator("div[class='flex flex-wrap gap-x-6 gap-y-3'] label:nth-child(1) input:nth-child(1)");
    await checkbox1.check();
    console.log('Is reading checkbox selected: ' + await checkbox1.isChecked());
    await expect(checkbox1).toBeChecked();
    await page.waitForTimeout(5000);
})

test('capture all available hobbies and print and count',async({ page}) =>{
    await page.goto('https://www.way2automation.com/automationpracticesite1.html');
    await page.getByRole('button', { name: 'Start Practicing Elements' }).click();
    const hobbies:Locator=page.locator("div[class='flex flex-wrap gap-x-6 gap-y-3'] label");
    const count = await hobbies.count();
    console.log('Total number of hobbies available: ' + count);
    for (let i = 0; i < count; i++) {
        const hobby = await hobbies.nth(i).textContent();
        console.log('Hobby ' + (i + 1) + ': ' + hobby);
    }

   await page.waitForTimeout(5000);
});  

test('unCheck all hobbies using loop',async ({ page}) =>{  
    
    await page.goto('https://www.way2automation.com/automationpracticesite1.html');
    await page.getByRole('button', { name: 'Start Practicing Elements' }).click();
    const hobbies:Locator=page.locator("div[class='flex flex-wrap gap-x-6 gap-y-3'] label input");
    const count = await hobbies.count();
    console.log('Total number of hobbies available: ' + count);
    for (let i = 0; i < count; i++) {
        const hobby = hobbies.nth(i);
        await hobby.check();
        console.log('Checked hobby ' + (i + 1));
        
        await hobby.uncheck();
        await expect(hobby).not.toBeChecked();
    }
    await page.waitForTimeout(5000);
});

test('Check the last 2 hobbies using loop',async ({ page }) =>{
    await page.goto('https://www.way2automation.com/automationpracticesite1.html');
    await page.getByRole('button', { name: 'Start Practicing Elements' }).click(); 
    const hobbies:Locator=page.locator("div[class='flex flex-wrap gap-x-6 gap-y-3'] label input");
    const count = await hobbies.count();
    console.log('Total number of hobbies available: ' + count);
    for (let i = count - 2; i < count; i++) {
        const hobby = hobbies.nth(i);
        await hobby.check();
        console.log('Checked hobby ' + (i + 1));
    }
    await page.waitForTimeout(5000);
});

test('Check the first 3 hobbies using loop',async ({ page }) =>{
    await page.goto('https://www.way2automation.com/automationpracticesite1.html');
    await page.getByRole('button', { name: 'Start Practicing Elements' }).click(); 
    const hobbies:Locator=page.locator("div[class='flex flex-wrap gap-x-6 gap-y-3'] label input");  
     
    const count = await hobbies.count();
    console.log('Total number of hobbies available: ' + count);
    for (let i = 0; i < Math.min(3, count); i++) {
        const hobby = hobbies.nth(i);
        await hobby.check();
        console.log('Checked hobby ' + (i + 1)+hobby);
    }
    await page.waitForTimeout(5000);
})

test('Check hobbies randomly using a loop',async({page})=>{
    await page.goto('https://www.way2automation.com/automationpracticesite1.html');
    await page.getByRole('button', { name: 'Start Practicing Elements' }).click(); 
    const hobbies:Locator=page.locator("div[class='flex flex-wrap gap-x-6 gap-y-3'] label input");
    const count = await hobbies.count();
    console.log('Total number of hobbies available: ' + count);
    const randomIndexes = new Set<number>();
     while (randomIndexes.size < 3) {
        const randomIndex = Math.floor(Math.random() * count);
        randomIndexes.add(randomIndex);
    }

    console.log("Selected indexes:", [...randomIndexes]);

    for (const index of randomIndexes) {
        await hobbies.nth(index).check();
        console.log(`Checked hobby at index: ${index}`);
    }


    await page.waitForTimeout(5000);
    
});

test('Chech hobbies based on value using a switch case',async({page})=>{
    await page.goto('https://www.way2automation.com/automationpracticesite1.html');
    await page.getByRole('button', { name: 'Start Practicing Elements' }).click();
    const hobbies:Locator=page.locator("div[class='flex flex-wrap gap-x-6 gap-y-3'] label input");
    const count = await hobbies.count();
    console.log('Total number of hobbies available: ' + count); 
    switch (count) {
        case 3:
            await hobbies.nth(0).check();
            console.log('Checked hobby at index 0');
            break; 
        case 4:
            await hobbies.nth(1).check();
            console.log('Checked hobby at index 1');
            break; 
        case 5:
            await hobbies.nth(4).check();
            console.log('Checked hobby at index 4');
            break;
        default:
            console.log('No matching case for the number of hobbies');
            break;
    }

    await page.waitForTimeout(5000);
});
    

