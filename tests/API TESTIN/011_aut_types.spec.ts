import {test, expect} from '@playwright/test';

import dotenv from 'dotenv';//import dotenv package to load environment variables from .env file
dotenv.config(); //load environment variables from .env file

import { Buffer } from 'buffer'; //import buffer package to encode username and password in base64 format

test.describe(' API authentication example', () => {

    test('no authentication', async ({ request }) => {
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const data = await response.json();
        console.log(data);
        expect(data).toHaveProperty('id', 1);
        expect(data).toHaveProperty('userId', 1);
        expect(data).toHaveProperty('title');
        expect(data).toHaveProperty('body');
    });

    //basic authentication
    //https://postman-echo.com/basic-auth
    //username: postman
    //password: password
    test('basic authentication', async ({ request }) => {
      
        const username = process.env.BASIC_AUTH_USERNAME || 'postman';
        const password = process.env.BASIC_AUTH_PASSWORD || 'password';

        //this will convert data to encoded string in base64 format
        const credentials = Buffer.from(`${username}:${password}`).toString('base64');
        console.log('Encoded credentials:', credentials);

        const response = await request.get('https://postman-echo.com/basic-auth', {

            headers: {
                'Authorization': `Basic ${credentials}`
            }
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const data = await response.json();
        console.log(data);
        expect(data).toHaveProperty('authenticated', true);
    });


    //open https//openweathermap.org/api
    test.skip('Api key authentication (open weather api)', async ({ request }) => {
        const api_key = process.env.OPENWEATHER_API_KEY || 'your_openweather_api_key_here';

        const response = await request.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: 'London',
                appid: api_key
            }
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const data = await response.json();
        console.log(data);
        expect(data).toHaveProperty('name', 'London');
    });

  //bearer token authentication
  test('bearer token authentication et user repository', async ({ request }) => {
      
    const bearerToken = process.env.BEARER_TOKEN || 'your_bearer_token_here';

    const response = await request.get('https://api.github.com/user/repos', {
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        }
    }); 

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(401);
    const data = await response.json();
    console.log(data);
    expect(Array.isArray(data)).toBe(false);
    
  });

  //OAUTH 2.0

  test('OAUTH 2.0 authentication', async ({ request }) => {
    

  });



});