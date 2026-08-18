import{test,expect,Locator,chromium} from '@playwright/test';

test('Validate to new tab',async()=>{

const browser=await chromium.launch();

const context=await browser.newContext();

const parentpage=await context.newPage();

await parentpage.goto('https://testautomationpractice.blogspot.com/');

const [childPage] =await Promise.all([context.waitForEvent('page'),parentpage.locator("button:has-text('New Tab')").click()]);

const pages=context.pages();

console.log("Number of pages created:",pages.length);

console.log("Title of the Parent page:", await pages[0].title());
    console.log("Title of the Child page:", await pages[1].title());

    //Appraoch 2: alternate

    console.log("Title of the Parent page:", await parentpage.title());
    console.log("Title of the Child page:", await childPage.title());

});