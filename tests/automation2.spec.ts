import{test,expect} from "@playwright/test";

//Fixture global variable: page,browser


test("Verify the url",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    let url:string= await page.url();

    console.log("URL",url)

    await expect(page).toHaveURL(/testautomationpractice.blogspot.com/);
})