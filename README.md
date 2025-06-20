# SvelteKit Better Auth Example

This is an example of how to use Better Auth with SvelteKit.

**Implements the following features:**

- Email & Password Sign-in
- Social Sign-in with Google
- Sign Up
- Email Verification
- Password Reset
- form verification using Superforms
- all pages implemented using Svelte 5 Runes

## How to run

1. Clone the code sandbox (or the repo) and open it in your code editor
2. Move .env.example to .env and provide necessary variables.
   For your Google sign in credentials see https://www.better-auth.com/docs/authentication/google
3. Run the following commands
   ```bash
   pnpm install
   npx drizzle-kit generate --name='Better-Auth-schema'
   npx drizzle-kit migrate
   pnpm dev
   ```
4. Open the browser and navigate to `http://localhost:5173`

## Changing database

If you want to use a different database, say Postgres then do the following:

1. Edit the database url in `.env`
2. Change `/src/lib/server/db/index.ts` to use a Postgres database per the Drizzle documentation.
3. Change `/src/lib/server/auth.ts` to use the postgres provider.
4. Change the dialect in `/drizzle.config.ts` to postgres.
5. Generate a new auth schema using `npx @better-auth/cli generate`
6. Replace the contents of `/src/lib/server/db/schema.ts` with the generated schema.
7. Delete folder `/src/drizzle`
8. Run the drizzle generate and migrate:
   ```bash
   npx drizzle-kit generate --name='Better-Auth-schema'
   npx drizzle-kit migrate
   ```

## Notes and references

### SvelteCookies BetterAuth plugin

The SvelteCookies plugin was implemented to fix this known [issue](https://github.com/better-auth/better-auth/issues/600).
The code for the plugin was taken from this [gist](https://gist.github.com/actuallyjamez/d345f52b3ecaaebadd320f98909951d6) courtesy of @actuallyjamez

### ChromeDevTools

My dev server kept throwing 404 errors while using Chrome in dev mode.
[vite-plugin-devtools-json](https://github.com/ChromeDevTools/vite-plugin-devtools-json) provided a way to prevent that.

### Superforms

I ran into some issues using runes with Svelte 5 and Superforms.
This sveltekit-superforms [issue](https://github.com/ciscoheat/sveltekit-superforms/issues/577) provided guidance.
