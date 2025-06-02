import type { PageServerLoad, Actions } from './$types.js';

import { fail } from '@sveltejs/kit';

import { superValidate, setError, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await auth.api.forgetPassword({
				body: {
					email: form.data.email,
					redirectTo: '/auth/reset-password'
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return setError(form, error.message || 'Reset password request failed');
			}
			console.log('Unexpected error during sign in', error);
			return setError(form, 'Unexpected error');
		}
		return message(form, 'Reset password request sent. Please check your inbox.');
	}
};
