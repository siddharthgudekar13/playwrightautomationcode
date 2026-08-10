import{test,expect,Locator} from '@playwright/test';

test('input text Demo in Playwright', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const inputText:Locator = page.locator('#name');
    await expect(inputText).toBeVisible();
    await expect(inputText).toBeEnabled();
    const maxLength = await inputText.getAttribute('maxlength');
    console.log('Max Length of the input field is: ' + maxLength);
    expect(maxLength).toBe('15');
    await inputText.fill('Ayush');
    await expect(inputText).toHaveValue('Ayush');
    const email:Locator=page.locator('#email');
    await expect(email).toBeVisible();
    await expect(email).toBeEnabled();
    await email.fill('ayush@example.com');
    await expect(email).toHaveValue('ayush@example.com');
    const phone:Locator=page.locator('#phone');
    await expect(phone).toBeVisible();
    await expect(phone).toBeEnabled();
    await phone.fill('1234567890');
    await expect(phone).toHaveValue('1234567890');  
    await page.waitForTimeout(5000);

});

test('Radio button Demo in Playwright', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const radioButton:Locator=page.locator('#female');
    await expect(radioButton).toBeVisible();
    await expect(radioButton).toBeEnabled();
    await radioButton.check();
    await expect(radioButton).toBeChecked();
    const radioButton2:Locator=page.locator('#male');
    await expect(radioButton2).toBeVisible();
    await expect(radioButton2).toBeEnabled();
    await radioButton2.check();
    await expect(radioButton2).toBeChecked();
    await expect(radioButton).not.toBeChecked();
    await page.waitForTimeout(5000);
});

test('Checkbox Demo in Playwright', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const checkbox:Locator=page.locator('#sunday');
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toBeEnabled();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    const checkbox2:Locator=page.locator('#monday');
    await expect(checkbox2).toBeVisible();
    await expect(checkbox2).toBeEnabled();
    await checkbox2.check();
    await expect(checkbox2).toBeChecked();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    await page.waitForTimeout(5000);
});

test('Multiple Checkbox Demo in Playwright', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const checkbox1:Locator=page.locator('#sunday');
    const checkbox2:Locator=page.locator('#monday');
    await expect(checkbox1).toBeVisible();
    await expect(checkbox1).toBeEnabled();
    await expect(checkbox2).toBeVisible();
    await expect(checkbox2).toBeEnabled();
    await checkbox1.check();
    await checkbox2.check();
    await expect(checkbox1).toBeChecked();
    await expect(checkbox2).toBeChecked();
    await page.waitForTimeout(5000);
});

test('Select all checkboxes and assert each is checked',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes:Locator[]=days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);
    for (const checkbox of checkboxes) {
        await expect(checkbox).toBeVisible();
        await expect(checkbox).toBeEnabled();
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    await page.waitForTimeout(5000);
});

test('Uncheck last 3 checkboxes and assert',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes:Locator[]=days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);
    for (const checkbox of checkboxes) {
        await expect(checkbox).toBeVisible();
        await expect(checkbox).toBeEnabled();
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    // Uncheck the last 3 checkboxes
    for (let i = checkboxes.length - 3; i < checkboxes.length; i++) {
        await checkboxes[i].uncheck();
        await expect(checkboxes[i]).not.toBeChecked();
    }
    await page.waitForTimeout(5000);
});

test('Check all checkboxes and assert each is checked, then uncheck last 3 and assert',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes:Locator[]=days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);
    for (const checkbox of checkboxes) {
        await expect(checkbox).toBeVisible();
        await expect(checkbox).toBeEnabled();
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    // Uncheck the last 3 checkboxes
    for (let i = checkboxes.length - 3; i < checkboxes.length; i++) {
        await checkboxes[i].uncheck();
        await expect(checkboxes[i]).not.toBeChecked();
    }
    await page.waitForTimeout(5000);
});

test('Toggle checkboxes: If checked, uncheck; if unchecked, check. Assert state flipped.',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes:Locator[]=days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

    for (const checkbox of checkboxes) {
        await expect(checkbox).toBeVisible();
        await expect(checkbox).toBeEnabled();
        const isChecked = await checkbox.isChecked();
        
        if (isChecked) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        } else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        } 
        await page.waitForTimeout(1000); // Optional: Add a small delay between toggles for better visibility

        }

    });

    test('Randomely select check boxes - Select checkboxes by index (1, 3, 6) and assert',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes:Locator[]=days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

    const indicesToSelect = [1, 3, 6]; // Indices of checkboxes to select (0-based)
    for (const index of indicesToSelect) {
        const checkbox = checkboxes[index];
        await expect(checkbox).toBeVisible();
        await expect(checkbox).toBeEnabled();
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    await page.waitForTimeout(5000);
});

test('Select the check box based on the Label',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes:Locator[]=days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

    for (const checkbox of checkboxes) {
        await expect(checkbox).toBeVisible();
        await expect(checkbox).toBeEnabled();
        const label = await checkbox.getAttribute('id');

        if (label === 'monday' || label === 'friday') {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }
    await page.waitForTimeout(5000);
});
