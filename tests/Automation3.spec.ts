import{test,expect,Locator} from "@playwright/test";

test("Verify the locator demo",async({page})=>{

await page.goto("http://127.0.0.1:5500/tests/app.html");

const logo:Locator=page.getByAltText("logo image");

await expect(logo).toBeVisible();

const text:Locator=page.getByText("Locate elements by their text content");

await expect(text).toBeVisible();

//await page.getByRole("button",{name:'Primary Action'})

await expect(page.getByRole("button",{name:'Primary Action'})).toBeVisible();

await page.getByLabel("Email Address").fill("test@example.com");

await page.getByLabel("Password").fill("password123");

await page.getByLabel("Your Age").fill("30");

await page.getByPlaceholder("Enter your full name").fill("Amardeep");

await page.getByPlaceholder("Phone number (xxx-xxx-xxxx)").fill("7620929532");

await expect(page.getByTitle("Home page link")).toHaveText("Home");

await expect(page.getByTitle("HyperText Markup Language")).toHaveText("HTML");

await expect(page.getByTestId("profile-name")).toHaveText("John Doe");

await expect(page.getByTestId("profile-email")).toHaveText("john.doe@example.com");

});