<script lang="ts">
	import { focusedFamilyStore } from '$lib/people.svelte';
	import type { Family } from "../types";

	let family = $state<Family | null>(null);
	focusedFamilyStore.subscribe((value) => family = value);
</script>


<!--{#snippet entry(person: Person)}
	<ul>
		Entity
		{#if children}
			{@render children()}
		{/if}
	</ul>
{/snippet}-->

<!--
<div class="container">
	{#key family}

	{/key}
	{@render entity(entity)}
	{@render entity()}
	{@render entity()}
</div>-->

<style>
	div.container {
		border: 1px solid var(--wui-border);
		border-radius: var(--wui-radius);
	}

	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		padding-left: 1rem;
	}
</style>
