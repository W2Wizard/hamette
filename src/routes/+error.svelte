<script>
	import { page } from "$app/stores";
	import { ArrowLeftOnRectangle, Home, Icon } from "svelte-hero-icons";
</script>

<div>
	<h1>Oops!</h1>
	<p>
		{$page.status}
		-
		{#if $page.error}
			{$page.error.message}
		{:else}
			Something went wrong, please try again later.
		{/if}
	</p>

	{#if $page.status == 401}
		<a class="wui button" href="/auth/signin">
			Login
			<Icon src={ArrowLeftOnRectangle} size="18px" />
		</a>
	{:else}
		<a class="wui button" href="/">
			Go back
			<Icon src={Home} size="18px" />
		</a>
	{/if}
</div>

<style>
	div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		& img {
			border-radius: var(--br);
		}
	}
</style>
