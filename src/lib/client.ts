import { createAuthClient } from 'better-auth/svelte';
import { passkeyClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
	baseURL: 'http://localhost:5173', // the base url of your auth server
	plugins: [passkeyClient()]
});
