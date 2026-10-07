import {test, expect} from '@playwright/test';
import Ajv from 'ajv';

test('Validate JSON schema', async ({ request }) => {
    const response=await request.get('https://mocktarget.apigee.net/json');
    expect(response.status()).toBe(200);
    const responseBody=await response.json();   
    console.log('Response Body:', responseBody);
    const schema = {
        type: 'object',
        properties: {   
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
        },
        required: ['firstName', 'lastName', 'city', 'state']
       
    }

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);
    expect(valid).toBe(true);
});

test('validate JSON response with schema2', async ({ request }) => {
    const response=await request.get('https://jsonplaceholder.typicode.com/posts/1');
    const responseBody=await response.json();
    console.log('Response Body:', responseBody);
    const schema = {
        type: 'object',
        properties: {   
            userId: { type: 'integer' },
            id: { type: 'integer' },
            title: { type: 'string' },
            body: { type: 'string' },
        },
        required: ['userId', 'id', 'title', 'body'],
        additionalProperties: true
    }

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const valid = validate(responseBody);
    expect(valid).toBe(true);
});
