import { betterAuth } from 'better-auth';

import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import {
	BETTER_AUTH_URL,
	BETTER_AUTH_SECRET,
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET
} from '$env/static/private';

import { db } from './db';
import { svelteCookies } from './auth-svelte-cookies';

export const auth = betterAuth({
	secret: BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: 'sqlite'
	}),
	plugins: [svelteCookies()],

	socialProviders: {
		google: {
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		}
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			console.log(`Send reset password email for ${user.email} url ${url}`);
			if (!url.includes(BETTER_AUTH_URL)) {
				console.log(`BUG: url should be ${BETTER_AUTH_URL}/api/auth${url}`);
			}
		}
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, request) => {
			console.log(`Send verification email for ${user.email} url ${url}`);
			if (!url.includes(BETTER_AUTH_URL)) {
				console.log(`BUG: url should be ${BETTER_AUTH_URL}/api/auth${url}`);
			}
		}
	}
});
