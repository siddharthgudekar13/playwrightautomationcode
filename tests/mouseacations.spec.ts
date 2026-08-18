import{test,expect,Locator} from '@playwright/test';

test('Mouse hover',async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/#');

    const pointme = page.locator('.dropbtn');

    await pointme.hover();

    const laptop=page.locator('.dropdown-content a:nth-child(1)')

    await laptop.hover();

    await page.waitForTimeout(5000);

})

test('Validate that right click',async({page})=>{

    await page.goto('http://swisnl.github.io/jQuery-contextMenu/demo.html');

   const rightButton= page.locator('span.context-menu-one');

   await rightButton.click({button:'right'})

   await page.waitForTimeout(5000);


})

test('Validate that double click',async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/#');

    const doubleclick = page.locator("button[ondblclick='myFunction1()']");

    await doubleclick.dblclick();

    const check1=page.locator('#field2');

    expect(check1).toHaveValue('Hello World!')

    await page.waitForTimeout(5000);

})

test.only('Validate drag and drop',async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/#');

    const Draggable=page.locator("#draggable");
    const droppable=page.locator("#droppable");

    //Appraoch 1:  mouse hover and drag manually

    //await Draggable.hover();
    //await page.mouse.down();
   // await droppable.hover();
   // await page.mouse.up();

    //Appraoch 2:  mouse hover and drag manually

    

    await Draggable.dragTo(droppable); // this wil perform drag and drop action

    await page.waitForTimeout(5000);

});