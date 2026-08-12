import{test,expect,Locator} from '@playwright/test';

test('frame demo', async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame=page.frames();

    console.log("Total frames: " + frame.length);

    const frame1=page.frame({ url:"https://ui.vision/demo/webtest/frames/frame_1.html"});

     if(frame1){
         
        await frame1.locator('input[name="mytext1"]').fill("Playwright");
        await page.waitForTimeout(7000);
     }
 });

    test('frame demo 2', async ({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames/');

        const frame2=page.frame({ url:"https://ui.vision/demo/webtest/frames/frame_2.html"});

         if(frame2){

            await frame2.locator('input[name="mytext2"]').fill("Playwright");
            await page.waitForTimeout(7000);
         }

    });

    test('frame demo 3', async ({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames/');

        const frame3=page.frame({ url:"https://ui.vision/demo/webtest/frames/frame_3.html"});

         if(frame3){

            await frame3.locator('input[name="mytext3"]').fill("Playwright");
            await page.waitForTimeout(7000);

           const childFrames = frame3.childFrames();

           console.log("Total child frames: " + childFrames.length);

           const radioButton=childFrames[0].getByRole("radio", { name: "i am a human" });
            
           await radioButton.check();
           await expect(radioButton).toBeChecked();
           await page.waitForTimeout(7000);

         }

    });

    test('frame demo 4', async ({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames/');

        const frame4=page.frame({ url:"https://ui.vision/demo/webtest/frames/frame_4.html"});

         if(frame4){

            await frame4.locator('input[name="mytext4"]').fill("Playwright");
            await page.waitForTimeout(7000);
         }
    });

    test.only('frame demo 5', async ({ page }) => {

        await page.goto('https://ui.vision/demo/webtest/frames/'); 
        const frame5=page.frame({ url:"https://ui.vision/demo/webtest/frames/frame_5.html"});

         if(frame5){  
            
            await frame5.locator('input[name="mytext5"]').fill("Playwright");

            const clickomlink=frame5.locator('a[href="https://ui.vision/"]');
            await clickomlink.click();
            await page.waitForTimeout(7000);
            const validateUIvisonlogo=page.locator('img[alt="UI.Vision RPA"]');

            console.log("UI.Vision logo is visible: " + await validateUIvisonlogo.isVisible());
            await expect(validateUIvisonlogo).toBeVisible();
            await page.waitForTimeout(7000);
         }

    });
