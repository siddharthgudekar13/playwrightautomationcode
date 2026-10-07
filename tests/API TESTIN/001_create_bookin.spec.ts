import { test, expect } from '@playwright/test';

const baseURL = 'https://restful-booker.herokuapp.com';

test('create booking with static data', async ({ request }) => {
  const requestBody = {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2018-01-01',
      checkout: '2019-01-01'
    },
    additionalneeds: 'Breakfast'
  };

  const response = await request.post(`${baseURL}/booking`, { data: requestBody });

  console.log('Response status:', response.status());
  console.log('Response body:', await response.json());
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('bookingid');
  //expect(responseBody.bookingid).toEqual(requestBody);

  const booking=await responseBody.booking;
  console.log('Booking details:', booking);
  expect(booking).toMatchObject(requestBody);
  
});
