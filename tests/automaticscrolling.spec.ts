import{test,expect,Locator} from '@playwright/test';

test('Scrolling to footer',async({page})=>{

    await page.goto('https://demowebshop.tricentis.com/');

    const footer=await page.locator('.footer-wrapper').innerText();

    console.log("Footer text captured: ",footer);

})

test('Scrolling inside dropdrown',async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator('#comboBox').click();

   const option= page.locator('#dropdown div:nth-child(100)')
   console.log(" option dropdown");
   await option.innerText();
   await option.click();
})

test('Scrolling inside the table', async ({ page }) => {
  await page.goto('https://datatables.net/examples/basic_init/scroll_xy.html');

  const name=await page.locator('tbody tr:nth-child(10) td:nth-child(2)').innerText(); //Automatic scrolling - vertical
  console.log("Last Name from 10th Row & 2nd Column :", name); //Kelly

  const email=await page.locator('tbody tr:nth-child(10) td:nth-child(9)').innerText(); //Automatic scrolling - Horizantal
  console.log("Email from 10th Row & 9th Column :", email); //c.kelly@datatables.net

});