<script lang="ts">
	import "@xyflow/svelte/dist/style.css";
	import Graph from "$lib/components/graph.svelte";
	import IconSpinner from "$lib/icons/icon-spinner.svelte";
	import { familiyStore } from "$lib/people.svelte.js";
	//import { type Entry } from "$lib/types.js";
	//import { familiyStore } from "$lib/people.svelte.js";
	//import { apiFetch } from "$lib/utils.js";
	const { data } = $props();

</script>

{#await data.entry}
	<div class="graph">
		<div class="loading">
			<IconSpinner size={32} />
		</div>
	</div>
{:then value}
	{#if !value}
		<p>No data</p>
	{:else}
		<!--{console.log(value)}-->
		{familiyStore.update((old) => old.set(value.person.id, value))}
		<Graph />
	{/if}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
	.graph {
		border-radius: var(--wui-radius);
		height: calc(100dvh - var(--main-padding) - var(--wui-header-height));
		box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 4px 2px inset;
	}

	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: calc(100dvh - var(--main-padding) - var(--wui-header-height));

	}
</style>
