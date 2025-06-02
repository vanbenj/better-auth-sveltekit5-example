import { z } from 'zod';

export const formSchema = z
	.object({
		fullname: z.string().min(2),
		email: z.string().email().min(2).max(50),
		password: z.string().min(2),
		passwordConfirm: z.string().min(2)
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: 'custom',
				path: ['passwordConfirm'],
				message: 'Passwords do not match'
			});
		}
	});

export type FormSchema = typeof formSchema;
