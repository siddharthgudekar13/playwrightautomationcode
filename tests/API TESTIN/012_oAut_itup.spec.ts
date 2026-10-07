import {test, expect} from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config();

const getRequiredEnv = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} is not configured`);
    }
    return value;
};

const GITHUB_CONFIG = {
    clientId: getRequiredEnv('GITHUB_CLIENT_ID'),
    clientSecret: getRequiredEnv('GITHUB_CLIENT_SECRET'),
    authorizationCode: getRequiredEnv('GITHUB_AUTHORIZATION_CODE'),
    tokenUrl: getRequiredEnv('GITHUB_TOKEN_URL')
};

test.describe('Login Feature', () => {
    test('Get Access Token', async ({ request }) => {
        const response = await request.post(GITHUB_CONFIG.tokenUrl, {
            headers: {
                'Accept': 'application/json'
            },
            data: {
                client_id: GITHUB_CONFIG.clientId,
                client_secret: GITHUB_CONFIG.clientSecret,
                code: GITHUB_CONFIG.authorizationCode
            }
        });

        const token = await response.json();
        expect(
            response.ok(),
            `GitHub token endpoint returned HTTP ${response.status()}`
        ).toBeTruthy();
        expect(
            token.error,
            token.error === 'bad_verification_code'
                ? 'GitHub rejected the authorization code. Generate a fresh code for this OAuth app, use the same redirect URI, and exchange it only once before it expires.'
                : typeof token.error === 'string'
                ? `GitHub OAuth exchange failed: ${token.error}${token.error_description ? ` (${token.error_description})` : ''}`
                : 'GitHub OAuth exchange failed'
        ).toBeUndefined();
        expect(token.access_token).toBeTruthy();
        expect(token.token_type).toBe('bearer');
    });
});