import {test, expect} from '@playwright/test';
const baseURL = 'https://restful-booker.herokuapp.com';

test('get_booking_details', async ({request}) => {

   const bookingId = 1;    // Replace with the actual booking ID you want to retrieve 

   const response = await request.get(`${baseURL}/booking/${bookingId}`);
    
   const responsebody = await response.json();
   console.log('Response status:', response.status());
   console.log('Response body:', responsebody);
   expect(response.status()).toBe(200);
   expect(responsebody).toHaveProperty('firstname');
   expect(responsebody).toHaveProperty('lastname');
   expect(responsebody).toHaveProperty('totalprice');
   expect(responsebody).toHaveProperty('depositpaid');
   expect(responsebody).toHaveProperty('bookingdates');
   expect(responsebody).toHaveProperty('additionalneeds');

});

test('get_booking_details query parameters', async ({request}) => {

   const firstName = 'Jim';    // Replace with the actual first name you want to filter by
   const lastName = 'Brown';      // Replace with the actual last name you want to filter by

   const response = await request.get(`${baseURL}/booking`, {
     params: {
       firstname: firstName,
       lastname: lastName
     }
   });
   console.log(response.url()); 
   const responsebody = await response.json();
   console.log('Response status:', response.status());
   console.log('Response body:', responsebody);
   expect(response.status()).toBe(200);
   
   for(const item of responsebody) {
    console.log('Booking ID:', item.bookingid);
     expect(item).toHaveProperty('bookingid');
     expect(item.bookingid).toBeGreaterThan(0);
     
   }

});