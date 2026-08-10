import{test,expect} from "@playwright/test";

//Fixture global variable: page,browser

test("verify page title",async({page})=>{
 
    await page.goto("https://testautomationpractice.blogspot.com/");

   let title:String=await page.title();

   console.log("Title",title)

   await expect(page).toHaveTitle("Automation Testing Practice");
})
