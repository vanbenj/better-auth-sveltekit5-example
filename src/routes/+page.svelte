<script>
	import { authClient } from '$lib/client';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { goto } from '$app/navigation';

	const session = authClient.useSession();
</script>

<Card.Root class="w-[350px]">
	<Card.Header>
		<Card.Title>User</Card.Title>
		<Card.Description>Welcome to the dashboard</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex items-center gap-2">
			<Avatar.Root>
				<Avatar.Image src={$session.data?.user.image} />
				<Avatar.Fallback>
					{$session.data?.user.name[0]}
				</Avatar.Fallback>
			</Avatar.Root>
			<div class="">
				<h3 class="text-sm">
					{$session.data?.user.name}
				</h3>
				<p class="text-muted-foreground text-xs">
					{$session.data?.user.email}
				</p>
			</div>
		</div>
	</Card.Content>
	<Card.Footer>
		<Button
			variant="outline"
			onclick={async () =>
				await authClient.signOut({
					fetchOptions: {
						onSuccess: () => {
							goto('/auth/sign-in');
						}
					}
				})}>Sign Out</Button
		>
	</Card.Footer>
</Card.Root>
