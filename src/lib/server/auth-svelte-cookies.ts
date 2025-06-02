import type { BetterAuthPlugin } from 'better-auth';
import { createAuthMiddleware } from 'better-auth/api';
import { parseSetCookieHeader } from 'better-auth/cookies';

export const svelteCookies = () => {
	return {
		id: 'svelte-cookies',
		hooks: {
			after: [
				{
					matcher(ctx) {
						return true;
					},
					handler: createAuthMiddleware(async (ctx) => {
						const returned = ctx.context.responseHeaders;

						if (returned instanceof Headers) {
							const setCookies = returned?.get('set-cookie');
							if (!setCookies) return;

							const { getRequestEvent } = await import('$app/server');
							const event = getRequestEvent();
							const parsed = parseSetCookieHeader(setCookies);

							for (const [name, { value, ...ops }] of parsed) {
								event.cookies.set(name, value, {
									sameSite: ops.samesite,
									path: ops.path || '/',
									expires: ops.expires,
									secure: ops.secure,
									httpOnly: ops.httponly,
									domain: ops.domain,
									maxAge: ops['max-age'],
									encode: (value) => value
								});
							}
						}
					})
				}
			]
		}
	} satisfies BetterAuthPlugin;
};
