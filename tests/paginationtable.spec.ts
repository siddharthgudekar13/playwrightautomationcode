import{test,expect,Locator} from '@playwright/text';

test('Read data from all the table pages',async({page})=>{
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
    let hasmorepages=true;
    while(hasmorepages){
        const rows:Locator=await page.locator('table#example tbody tr').all();
        for(const row of rows){
            const rowData:string=await row.innerText();
            console.log('Row data is: ' + rowData);
        }

        await page.waitForTimeout(5000);

        const nextButton:Locator=await page.locator('a#example_next');
        const isDisabled:string | null = await nextButton.getAttribute('class');
        if(isDisabled?.includes('disabled')){
            hasmorepages=false;
        }else{
            await nextButton.click();
        }
    }
});

test('Filter the rows and check the rows count',async({page})=>{
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
   const filterInput:Locator=await page.locator('dt-length-0');
   filterInput.selectOption('{label: "25"}');

   const rows:Locator=await page.locator('table#example tbody tr').all();
   expect(rows.length).toBe(25);

   const rows2:Locator=await page.locator('table#example tbody tr').all();
   expect(rows2).toHaveCount(25);
});

test('Search for specific data in a table',async({page})=>{
    await page.goto('https://datatables.net/examples/basic_init/zero_configuration.html');
    const serachInput:Locator=await page.locator('#dt-search-0');

    await serachInput.fill('Tiger Nixon');
    const rows:Locator=await page.locator('table#example tbody tr').all();
    if(rows.length>=1){

        let matchingRowFound=false;
        for(const row of rows){
            const rowData:string=await row.innerText();
            if(rowData.includes('Tiger Nixon')){
                matchingRowFound=true;
                console.log('Matching row found: ' + rowData);
                break;
            }
            else{
                console.log('No matching row found');
            }
        }

    }

})