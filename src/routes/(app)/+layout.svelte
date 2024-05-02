<script lang="ts">
	const { children } = $props();
</script>

<header>
	<nav class="center">
		<div>
			<a class="wui" href="/">Home</a>
			<a class="wui" href="/settings">Settings</a>
		</div>
		<form method="post" action="/auth/logout">
			<button class="wui" type="submit">Sign out</button>
		</form>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style lang="scss">
	header {
		display: grid;
		background-color: var(--wui-header);
		width: 100%;
		height: var(--wui-header-height);
		padding-inline: 1rem;
	}
	
	main {
		--main-padding: 1rem;
		padding-inline: var(--main-padding);
	}

	nav {
		justify-content: space-between;
	}

</style>
