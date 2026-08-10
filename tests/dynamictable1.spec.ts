
import { test, expect, Locator } from '@playwright/test';

test('Handling dynamic web tables', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const table: Locator = page.locator('#taskTable');

    await expect(table).toBeVisible();

});


test('Retrieve CPU load value for Chrome process', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const table: Locator = page.locator('#taskTable');

    await expect(table).toBeVisible();

    const rows: Locator = table.locator('tbody tr');

    const rowCount: number = await rows.count();

    console.log(`Total number of rows in the table: ${rowCount}`);

    expect(rowCount).toBeGreaterThan(0);

    let cpuLoad = '';

    for (let i = 0; i < rowCount; i++) {

        const row: Locator = rows.nth(i);

        const processName: string =
            (await row.locator('td').nth(0).innerText()).trim();

        if (processName === 'Chrome') {

            cpuLoad =
                (await row.locator('td').nth(1).innerText()).trim();

            console.log('CPU Load of Chrome:', cpuLoad);

            break;
        }
    }

    expect(cpuLoad).not.toBe('');

    // CPU value should contain %
    //expect(cpuLoad).toContain('cpuLoad');

    console.log(`Chrome CPU Load: ${cpuLoad}`);
});


test('Retrieve Memory usage value for Chrome process', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const table: Locator = page.locator('#taskTable');

    await expect(table).toBeVisible();

    const rows: Locator = table.locator('tbody tr');

    const rowCount: number = await rows.count();

    console.log(`Total number of rows in the table: ${rowCount}`);

    expect(rowCount).toBeGreaterThan(0);

    let memoryUsage = '';

    for (let i = 0; i < rowCount; i++) {

        const row: Locator = rows.nth(i);

        const processName: string =
            (await row.locator('td').nth(0).innerText()).trim();

        if (processName === 'Chrome') {

            memoryUsage =
                (await row.locator('td').nth(2).innerText()).trim();

            console.log('Memory Usage of Chrome:', memoryUsage);

            break;
        }
    }

    expect(memoryUsage).not.toBe('');

    // Memory value should contain MB
    expect(memoryUsage).toContain('MB');

    console.log(`Chrome Memory Usage: ${memoryUsage}`);
});