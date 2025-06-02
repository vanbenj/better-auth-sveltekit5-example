import type { PageServerLoad, Actions } from './$types.js';

import { fail, redirect } from '@sveltejs/kit';

import { superValidate, setError, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema.js';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	signUp: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		try {
			await auth.api.signUpEmail({
				body: {
					email: form.data.email,
					password: form.data.password,
					name: form.data.fullname, // Optional: extract name from email
					callbackURL: '/auth/verification-success'
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return setError(form, error.message || 'Signin failed');
			}
			console.log('Unexpected error during sign in', error);
			return setError(form, 'Unexpected error');
		}
		return message(
			form,
			'Your account has been created. Please check your inbox for an activation link.'
		);
	},
	google: async () => {
		const res = await auth.api.signInSocial({
			body: {
				provider: 'google',
				callbackURL: '/'
			}
		});
		return redirect(302, res.url!);
	}
};
