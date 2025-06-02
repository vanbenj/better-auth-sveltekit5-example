<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form use:enhance method="POST" action="?/google" class="w-full">
	<button
		type="submit"
		class="flex w-full items-center justify-center gap-3 rounded-full border border-slate-500 p-3"
	>
		<img src="/google-logo.svg" alt="Google logo" class="h-6 w-6" />
		<p>Sign in with Google</p>
	</button>
</form>
