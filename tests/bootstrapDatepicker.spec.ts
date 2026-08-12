import { test, expect, Locator } from '@playwright/test';

test('Bootstrap datepicker', async ({ page }) => {

    await page.goto('https://www.booking.com/');

    const signInpop: Locator = page.locator('.fc70cba028.ca6ff50764');
    await signInpop.click();

    // Open date picker
    const searchDateInput: Locator = page.locator(
        "button[data-testid='searchbox-dates-container']"
    );


    await searchDateInput.click();

    await page.waitForTimeout(2000); // Wait for the date picker to open

    

    // Check-in date
    const checkinYear = "2026";
    const checkinMonth = "December";
    const checkinDay = "25";

    // Navigate to check-in month
    while (true) {

        const checkInMonthYear = await page
            .locator('#bui-calendar-month-2026-7')
            .nth(0)
            .innerText();

        const currentMonth = checkInMonthYear.split(" ")[0];
        const currentYear = checkInMonthYear.split(" ")[1];

        console.log(`Current Check-in Month: ${currentMonth} ${currentYear}`);

        if (
            currentMonth === checkinMonth &&
            currentYear === checkinYear
        ) {
            break;
        }

        const nextButton = page
            .locator('span.fc70cba028.e2a1cd6bfe')
            .nth(0);

        await nextButton.click();
    }

    // Select check-in day
    const checkinDays = await page
        .locator('#bui-calendar-body-2026-7')
        .nth(0)
        .locator('td')
        .all();

    for (const dt of checkinDays) {

        const dayText = (await dt.textContent())?.trim();

        if (dayText === checkinDay) {
            await dt.click();
            break;
        }
    }

    // Check-out date
    const checkoutYear = "2026";
    const checkoutMonth = "December";
    const checkoutDay = "30";

    // Navigate to check-out month
    while (true) {

        const checkOutMonthYear = await page
            .locator('#bui-calendar-month-2026-7')
            .nth(1)
            .innerText();

        const currentMonth = checkOutMonthYear.split(" ")[0];
        const currentYear = checkOutMonthYear.split(" ")[1];

        console.log(`Current Check-out Month: ${currentMonth} ${currentYear}`);

        if (
            currentMonth === checkoutMonth &&
            currentYear === checkoutYear
        ) {
            break;
        }

        const nextButton = page
            .locator('span.fc70cba028.e2a1cd6bfe')
            .nth(1);

        await nextButton.click();
    }

    // Select check-out day
    const checkoutDays = await page
        .locator('#bui-calendar-body-2026-7')
        .nth(1)
        .locator('td')
        .all();

    for (const dt of checkoutDays) {

        const dayText = (await dt.textContent())?.trim();

        if (dayText === checkoutDay) {
            await dt.click();
            break;
        }
    }

    await page.waitForTimeout(3000);
});