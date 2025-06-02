<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';

	import { formSchema, type FormSchema } from './schema';
	import { superForm } from 'sveltekit-superforms';
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
	let message = $derived(form.message);
</script>

<Card.Root class="mx-auto mt-[50vh] max-w-sm -translate-y-1/2">
	<Card.Header class="text-center">
		<Card.Title class="text-2xl">Forgot Password</Card.Title>
		<Card.Description
			>Enter the email address for your account so we can send you reset instructions.</Card.Description
		>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<form method="POST" use:enhance>
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

			<div class="flex justify-between pb-4">
				<a href="/auth/sign-in" class="text-sm text-slate-500 hover:text-slate-700"
					>Back to Sign in</a
				>
			</div>

			<Form.Button disabled={$submitting} class="w-full">
				{$submitting ? 'Submitting...' : 'Send Reset Link'}
			</Form.Button>
			{#if $errors?._errors}
				<div class="mt-3 rounded-md text-red-700">
					{$errors?._errors}
				</div>
			{/if}
		</form>
		{#if $message}
			<div class="mt-3 rounded-md text-center text-green-700">
				{$message}
				<div class="flex justify-between pt-6">
					<Form.Button href="/auth/sign-in" class="w-full">Go to sign in</Form.Button>
				</div>
			</div>
		{/if}
	</Card.Content>
</Card.Root>
