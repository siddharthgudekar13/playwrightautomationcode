import { test, expect,Locator } from '@playwright/test';

test("Verify CSS locator",async ({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");
    /*const usernameInput = page.locator("input#small-searchterms");
     await usernameInput.fill("T-shirt");
    await expect(usernameInput).toBeVisible();
    await page.waitForTimeout(5000); */

   // tag#id

    const searchbox:Locator= page.locator("input#small-searchterms");
    await searchbox.fill("T-Shirts");

    await expect(page.locator("input#small-searchterms")).toBeVisible();
    await page.locator("input#small-searchterms").fill("T-Shirts");
    await page.locator("#small-searchterms").fill("T-Shirts");

   // await page.waitForTimeout(5000);

    //tag.class

    await page.locator("input.search-box-text").fill("T-Shirts");
    await page.locator(".search-box-text").fill("T-Shirts");
    await expect(page.locator(".search-box-text")).toBeVisible();
    await page.waitForTimeout(5000);

    //tag[attribute=value]
    await page.locator("input[value='Search store']").fill("T-Shirts");
    await page.locator("[value='Search store']").fill("T-Shirts");
    await expect(page.locator("[value='Search store']")).toBeVisible();
   // await page.waitForTimeout(5000);

    ////tag.class[attribute=value]
    await page.locator("input.search-box-text[value='Search store']").fill("T-Shirts");
    await page.locator(".search-box-text[value='Search store']").fill("T-Shirts");


    await page.waitForTimeout(5000);


});