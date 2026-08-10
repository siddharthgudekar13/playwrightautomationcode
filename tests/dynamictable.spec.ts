import{test, expect, Locator } from '@playwright/test';

test('Verify Chrome CPU load in dynamic table',async({page})=>{
    await page.goto('https://practice.expandtesting.com/dynamic-table');

   const dynamicTable:Locator = await page.locator('table.table.table-striped');

   await expect(dynamicTable).toBeVisible();
  
});

test('Select all the rows, then find number of rows',async({page})=>{
    await page.goto('https://practice.expandtesting.com/dynamic-table');
    const rows:Locator = await page.locator('table.table.table-striped tbody tr');
    const rowCount:number = await rows.count();
    console.log('Number of selected rows is: ' + rowCount);

});

test('For Chrome process get value of CPU load',async({page})=>{
    await page.goto('https://practice.expandtesting.com/dynamic-table');
    const rows:Locator= await page.locator('table.table.table-striped tbody tr');
    const rowCount:number = await rows.count();
    console.log('Number of selected rows is: ' + rowCount);

    for (let i = 0; i < rowCount; i++) {
        const row:Locator = rows.nth(i);
        const processName:string = await row.locator('td').nth(0).innerText();

        if (processName === 'Chrome') {
            const cpuLoad:string = await row.locator('td:has-text("%")').innerText();
            console.log('CPU Load of Chrome:', cpuLoad);
            break;
        }
    }

    const yellowlable:Locator=await page.locator('#chrome-cpu');
    const yellowLableText:string=await yellowlable.innerText();
    console.log('Value in the yellow label is: ' + yellowLableText);

    if (yellowLableText.includes('cpuLoad')) {
        console.log('The value in the yellow label contains %');
    }else {
        console.log('The value in the yellow label does not contain %');
    }
    expect(yellowLableText).toContain('%');

    await page.waitForTimeout(5000);

    });