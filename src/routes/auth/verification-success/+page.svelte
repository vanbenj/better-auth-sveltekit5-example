<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
</script>

<Card.Root class="mx-auto mt-[50vh] max-w-sm -translate-y-1/2">
	<Card.Header class="text-center">
		<Card.Title class="text-2xl">Verification Success</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<div class="mt-3 rounded-md text-center text-green-700">
			Congratulations! Your account has been successfully verified.
		</div>
		<div class="flex justify-between pt-6">
			<Button href="/auth/sign-in" class="w-full">Go to sign in</Button>
		</div>
	</Card.Content>
</Card.Root>
