import{test,expect,Locator} from '@playwright/test';

test('JQuery datepicker', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/');
    const dateInput: Locator = page.locator('#datepicker');
    await dateInput.click();

   let checkinYear="2026";
   let checkinMonth="December";
   let checkinDay="25"; 

   while(true){
    const currentMonth = await page.locator('.ui-datepicker-month').textContent();
    const currentYear = await page.locator('.ui-datepicker-year').textContent();

    if(currentMonth === checkinMonth && currentYear === checkinYear) {
        break;
    }

    const nextButton = page.locator('.ui-datepicker-next');
    await nextButton.click();

   }

    const days =await page.locator('.ui-datepicker-calendar td a').all();

    for(let dt of days){
        const dayText = await dt.textContent();
        if(dayText===checkinDay){

            await dt.click();
            break

        }

    }
    
    await page.waitForTimeout(6000);
    
});
    