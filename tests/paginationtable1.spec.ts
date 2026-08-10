import { test } from '@playwright/test';

test('Read and print data from paginated table', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const rows = page.locator('#productTable tbody tr');
    const paginationButtons = page.locator('#pagination li');

    const pageCount = await paginationButtons.count();

    console.log(`Total Pages: ${pageCount}`);

    for (let p = 0; p < pageCount; p++) {

        // Click pagination page
        await paginationButtons.nth(p).click();

        // Read rows from current page
        const rowCount = await rows.count();

        console.log(`\n========== Page ${p + 1} ==========`);

        for (let r = 0; r < rowCount; r++) {

            const row = rows.nth(r);

            const id = await row.locator('td').nth(0).innerText();
            const name = await row.locator('td').nth(1).innerText();
            const price = await row.locator('td').nth(2).innerText();

            console.log(
                `ID: ${id} | Name: ${name} | Price: ${price}`
            );
        }
    }
});