import { test, expect } from '@playwright/test';

test('frame demo 1', async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    console.log('Total frames: ' + page.frames().length);

    const frame1 = page.frame({
        url: 'https://ui.vision/demo/webtest/frames/frame_1.html'
    });

    expect(frame1).not.toBeNull();

    if (frame1) {
        const input = frame1.locator('input[name="mytext1"]');

        await input.fill('Playwright');

        await expect(input).toHaveValue('Playwright');
    }
});


test('frame demo 2', async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame2 = page.frame({
        url: 'https://ui.vision/demo/webtest/frames/frame_2.html'
    });

    expect(frame2).not.toBeNull();

    if (frame2) {
        const input = frame2.locator('input[name="mytext2"]');

        await input.fill('Playwright');

        await expect(input).toHaveValue('Playwright');
    }
});


test('frame demo 3 - child frame', async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame3 = page.frame({
        url: 'https://ui.vision/demo/webtest/frames/frame_3.html'
    });

    expect(frame3).not.toBeNull();

    if (frame3) {

        // Fill input inside frame 3
        const input = frame3.locator('input[name="mytext3"]');

        await input.fill('Playwright');

        await expect(input).toHaveValue('Playwright');

        // Get child frames
        const childFrames = frame3.childFrames();

        console.log('Total child frames: ' + childFrames.length);

        expect(childFrames.length).toBeGreaterThan(0);

        const childFrame = childFrames[0];

        // "radio" = role
        // "I am a human" = accessible name
        const radioButton = childFrame.getByRole('radio', {
            name: 'I am a human'
        });

        await radioButton.check();

        await expect(radioButton).toBeChecked();
    }
});


test('frame demo 4', async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame4 = page.frame({
        url: 'https://ui.vision/demo/webtest/frames/frame_4.html'
    });

    expect(frame4).not.toBeNull();

    if (frame4) {

        const input = frame4.locator('input[name="mytext4"]');

        await input.fill('Playwright');

        await expect(input).toHaveValue('Playwright');
    }
});


test('frame demo 5', async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame5 = page.frame({
        url: 'https://ui.vision/demo/webtest/frames/frame_5.html'
    });

    expect(frame5).not.toBeNull();

    if (frame5) {

        // Fill input
        const input = frame5.locator('input[name="mytext5"]');

        await input.fill('Playwright');

        await expect(input).toHaveValue('Playwright');

        // Click UI.Vision link
        const clickOnLink = frame5.locator(
            'a[href="https://ui.vision/"]'
        );

        await clickOnLink.click();

        // Wait for navigation
        await page.waitForLoadState('domcontentloaded');

        // Validate UI.Vision logo
        const uiVisionLogo = page.locator(
            'img[alt="UI.Vision RPA"]'
        );

        await expect(uiVisionLogo).toBeVisible();

        console.log(
            'UI.Vision logo is visible: ' +
            await uiVisionLogo.isVisible()
        );
    }
});