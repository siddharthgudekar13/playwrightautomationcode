//https://demo.playwright.dev/api-mocking/api/v1/fruits

import { test, expect } from '@playwright/test';

test('Mocking API response', async ({ page }) => {

    await page.route('**/api/v1/fruits', async (route) => {
        
        const fackeresjson =  [
                { "id": 1, "name": "Amar6" },
                { "id": 2, "name": "Banana" },
                { "id": 3, "name": "Cherry" }
            ]

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(fackeresjson),
            }); 
    });

    await page.goto('https://demo.playwright.dev/api-mocking');
    await expect(page.getByRole('heading', { name: 'Fruits' })).toBeVisible();
    await expect(page.getByRole('listitem')).toHaveCount(3);

});
//witout mocking the API response, we can modify the live API response using request.get() method.
test(' modifying  live API response', async ({ request }) => {

    const response = await request.get('https://demo.playwright.dev/api-mocking/api/v1/fruits') ;

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const fruits = await response.json();
    console.log(fruits);

   
});

//example23 
//modifying the live API response using request.get() method and then mocking the response using route.fulfill() method.

test('modifying live API response and mocking it', async ({ page, request }) => {


    //fetc te actual API response using request.get() method
    await page.route('**/api/v1/fruits', async (route) => {
        const response=await route.fetch();
        const json=await response.json();
        console.log(json);
        json.push({ "id": 4, "name": "AMAR" });
        await route.fulfill({
            status: 200,    
            contentType: 'application/json',
            body: JSON.stringify(json),
        });
    });

    await page.goto('https://demo.playwright.dev/api-mocking');
    await expect(page.getByRole('heading', { name: 'Fruits' })).toBeVisible();
    //await expect(page.getByRole('listitem')).toHaveCount(4); 
});