<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Eye, EyeOff } from '@lucide/svelte';

	export let value: string;
	export let props: Record<string, any> = {};
	export let placeholder = 'Enter your password';

	let showPassword = false;
</script>

<div class="relative">
	<Input {...props} bind:value type={showPassword ? 'text' : 'password'} {placeholder} />
	<button
		type="button"
		tabindex="-1"
		class="absolute top-1/2 right-3 -translate-y-1/2 text-slate-500 hover:text-slate-700"
		onclick={() => (showPassword = !showPassword)}
	>
		{#if showPassword}
			<EyeOff class="size-5 text-slate-500" />
		{:else}
			<Eye class="size-5 text-slate-500" />
		{/if}
	</button>
</div>
