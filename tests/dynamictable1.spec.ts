import{test,expect,Locator} from '@playwright/test';

test('Handling dynamic web tables',async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    const table:Locator=page.locator('#taskTable');
    await expect(table).toBeVisible();
});