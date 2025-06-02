<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from './schema';
	import { superForm } from 'sveltekit-superforms';
	import Password from '$lib/components/auth/password.svelte';
	import GoogleSignIn from '$lib/components/auth/google-sign-in.svelte';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let form = $derived(
		superForm(data.form, {
			validators: zodClient(formSchema),
			dataType: 'json'
		})
	);
	let formData = $derived(form.form);
	let errors = $derived(form.errors);
	let submitting = $derived(form.submitting);
	let enhance = $derived(form.enhance);
</script>

<Card.Root class="mx-auto mt-[50vh] max-w-sm -translate-y-1/2">
	<Card.Header class="text-center">
		<Card.Title class="text-2xl">Sign In</Card.Title>
		<Card.Description>Enter your email below to sign into your account</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<div class="flex justify-center">
			<GoogleSignIn />
		</div>

		<div class="relative flex items-center py-3">
			<hr class="flex-1 border-slate-500" />
			<span class="mx-4 text-xs text-slate-500">OR</span>
			<hr class="flex-1 border-slate-500" />
		</div>

		<form method="POST" action="?/signIn" use:enhance>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input
							{...props}
							bind:value={$formData.email}
							type="email"
							placeholder="Enter your email"
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Password bind:value={$formData.password} {props} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<div class="flex justify-between pb-3">
				<a href="/auth/sign-up">Sign up</a>
				<a href="/auth/forgot-password">Forgot password?</a>
			</div>

			<Form.Button disabled={$submitting} class="w-full">
				{$submitting ? 'Submitting...' : 'Submit'}
			</Form.Button>
			{#if $errors?._errors}
				<div class="mt-3 rounded-md text-red-700">
					{$errors?._errors}
				</div>
			{/if}
		</form>
	</Card.Content>
</Card.Root>
