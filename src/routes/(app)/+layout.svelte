<script lang="ts">
	const { children } = $props();
</script>

<header>
	<h1>App</h1>
	<nav>
		<a href="/">Home</a>
		<a href="/about">About</a>
		<form method="post" action="/auth/logout">
			<button type="submit">Sign out</button>
		</form>
	</nav>
</header>

{@render children()}

<style lang="scss">
	header {
		background-color: #f0f0f0;
		padding: 1rem;
		width: 100%;
	}

</style>
