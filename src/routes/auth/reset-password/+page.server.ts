import type { PageServerLoad, Actions } from './$types.js';

import { fail } from '@sveltejs/kit';

import { superValidate, setError, message } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { formSchema } from './schema.js';
import { authClient } from '$lib/client.js';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(formSchema));
		// Get search parameters
		const searchParams = event.url.searchParams;

		// Example: Get a specific parameter
		const token = searchParams.get('token') ?? undefined;

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		try {
			const { error } = await authClient.resetPassword({
				newPassword: form.data.password,
				token
			});
			if (error) {
				return setError(form, error.message || 'Reset password failed');
			}
		} catch (error) {
			console.log('Unexpected error during sign in', error);
			return setError(form, 'Unexpected error');
		}
		return message(form, `Password reset successful.`);
	}
};
