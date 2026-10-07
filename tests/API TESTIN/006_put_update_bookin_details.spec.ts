import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

function readJsonFile(filePath: string): any {
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

const baseURL = 'https://restful-booker.herokuapp.com';

test('update booking - create, get, update a booking record,delete', async ({ request }) => {
  const createBookingData = readJsonFile(path.resolve(__dirname, '../../Testdata/post_request_body.json'));

  const createResponse = await request.post(`${baseURL}/booking`, {
    data: createBookingData,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  expect(createResponse.status()).toBe(200);
  const createResponseBody = await createResponse.json();
  console.log('Create Booking Response:', createResponseBody);

  const bookingId = createResponseBody.bookingid;
  expect(bookingId).toBeGreaterThan(0);
  console.log('Created Booking ID:', bookingId);

  const getResponse = await request.get(`${baseURL}/booking/${bookingId}`);
  expect(getResponse.status()).toBe(200);
  const getResponseBody = await getResponse.json();
  console.log('Get Booking Response:', getResponseBody);
  expect(getResponseBody).toMatchObject(createBookingData);

  const authResponse = await request.post(`${baseURL}/auth`, {
    data: {
      username: 'admin',
      password: 'password123'
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  expect(authResponse.status()).toBe(200);
  const authResponseBody = await authResponse.json();
  console.log('Auth Response:', authResponseBody);
  expect(authResponseBody).toHaveProperty('token');

  const updatedBookingData = {
    firstname: 'Ayush',
    lastname: 'kware',
    totalprice: 222,
    depositpaid: false,
    bookingdates: {
      checkin: '2020-02-05',
      checkout: '2020-02-10'
    },
    additionalneeds: 'Dinner'
  };
  const patchBookingData = readJsonFile(path.resolve(__dirname, '../../Testdata/patc_bookin_update.json'));
  const updatepatchResponse = await request.patch(`${baseURL}/booking/${bookingId}`, {
    data: patchBookingData,
    headers: {  
    'Content-Type': 'application/json',
    Cookie: `token=${authResponseBody.token}`
    }
  });   
  
  expect(updatepatchResponse.status()).toBe(200);
  const updatepatchResponseBody = await updatepatchResponse.json();
  console.log('Patch Update Booking Response:', updatepatchResponseBody);
  expect(updatepatchResponseBody).toMatchObject(patchBookingData);

  const updateResponse = await request.put(`${baseURL}/booking/${bookingId}`, {
    data: updatedBookingData,
    headers: {
      'Content-Type': 'application/json',
      Cookie: `token=${authResponseBody.token}`
    }
  });

  expect(updateResponse.status()).toBe(200);
  expect(updateResponse.statusText()).toBe('OK');
  const updateResponseBody = await updateResponse.json();
  console.log('Update Booking Response:', updateResponseBody);
  expect(updateResponseBody).toMatchObject(updatedBookingData);

  const verificationResponse = await request.get(`${baseURL}/booking/${bookingId}`);
  expect(verificationResponse.status()).toBe(200);
  const verificationBody = await verificationResponse.json();
  console.log('Updated Booking Verification:', verificationBody);
  expect(verificationBody).toMatchObject(updatedBookingData);

    const deleteResponse = await request.delete(`${baseURL}/booking/${bookingId}`, {
        headers: {
            Cookie: `token=${authResponseBody.token}`
        }
    });
    expect(deleteResponse.status()).toBe(201);
    const deleteResponseBody = await deleteResponse.text();
    console.log('Delete Booking Response:', deleteResponseBody);    

 });   