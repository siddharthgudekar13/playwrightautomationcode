import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
const baseURL = 'https://restful-booker.herokuapp.com';

test('create booking with static facker library data', async ({ request }) => {
 const firstName = faker.person.firstName();
 const lastName = faker.person.lastName();
 const totalPrice = faker.number.int({ min: 100, max: 1000 });
 const depositPaid = faker.datatype.boolean();
 const checkinDate = faker.date.future();
 const checkoutDate = faker.date.future({ refDate: checkinDate });
 const formattedCheckinDate = checkinDate.toISOString().slice(0, 10);
 const formattedCheckoutDate = checkoutDate.toISOString().slice(0, 10);
 const additionalNeeds = faker.lorem.words(3);
 const requestBody = {
   firstname: firstName,
   lastname: lastName,
   totalprice: totalPrice,
   depositpaid: depositPaid,
   bookingdates: {
     checkin: formattedCheckinDate,
     checkout: formattedCheckoutDate
   },
   additionalneeds: additionalNeeds
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
