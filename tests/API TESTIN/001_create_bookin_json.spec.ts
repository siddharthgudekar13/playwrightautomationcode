import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
const baseURL = 'https://restful-booker.herokuapp.com';

test('create booking with static data', async ({ request }) => {
  const requestBody = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../Testdata/post_request_body.json'), 'utf-8')
  );

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
