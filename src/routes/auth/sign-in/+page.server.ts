import type { PageServerLoad, Actions } from './$types.js';

import { fail, redirect } from '@sveltejs/kit';

import { superValidate, setError } from 'sveltekit-superforms';
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
	signIn: async (event) => {
		const form = await superValidate(event, zod(formSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await auth.api.signInEmail({
				body: {
					email: form.data.email,
					password: form.data.password,
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
		return redirect(302, '/');
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
