import{test,expect,Locator} from '@playwright/test';

test('Self XPath Demo in Playwright', async ({ page }) => {
    await page.goto("https://www.w3schools.com/sql/sql_and.asp");

  const self:Locator = page.locator("//td[text()='Germany']/self::td");
    await expect(self).toHaveText('Germany');
  
})
//Parent
test('Parent XPath Demo in Playwright', async ({ page }) => {
    await page.goto("https://www.w3schools.com/sql/sql_and.asp");

  const parent:Locator = page.locator("//td[text()='Germany']/parent::tr");
   
    await expect(parent).toContainText("Germany");
});
//child 
test('Child XPath Demo in Playwright', async ({ page }) => {
    await page.goto("https://www.w3schools.com/sql/sql_and.asp");

  const child:Locator = page.locator("//table[@class='ws-table-all notranslate']//tr[2]/child::td");
   

    await expect(child).toHaveCount(7); // Expect the number of child td elements to be 7
    }); 

//ancestor
test('Ancestor XPath Demo in Playwright', async ({ page }) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");

  const table:Locator=page.locator("//td[text()='Germany']/ancestor::table")
    await expect(table).toHaveAttribute('id','customers');
});

//descendant
test('Descendant XPath Demo in Playwright', async ({ page }) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");
    const allTds:Locator=page.locator("//table[@id='customers']/descendant::td")
        await expect(allTds).toHaveCount(18);
});
//following
test('Following XPath Demo in Playwright', async ({ page }) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");
    const followingCell:Locator=page.locator("//td[normalize-space()='Germany']/following::td[1]");
      await expect(followingCell).toHaveText("Centro comercial Moctezuma");
});

//following-sibling
test('Following-Sibling XPath Demo in Playwright', async ({ page }) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");
    const rightsiblings:Locator=page.locator("//td[normalize-space()='Maria Anders']/following-sibling::td");
        await expect(rightsiblings).toHaveCount(1);
});
//preceding
test('Preceding XPath Demo in Playwright', async ({ page }) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");
    const precedingCell:Locator=page.locator("//td[text()='Germany']/preceding::td[1]");
        await expect(precedingCell).toHaveText("Maria Anders");
});
//preceding-sibling
test('Preceding-Sibling XPath Demo in Playwright', async ({ page }) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");
    const leftSiblings:Locator=page.locator("//td[text()='Germany']/preceding-sibling::td");
         await expect(leftSiblings).toHaveCount(2);
    
        await expect(leftSiblings.nth(0)).toHaveText("Alfreds Futterkiste")
        await expect(leftSiblings.nth(1)).toHaveText("Maria Anders")
});