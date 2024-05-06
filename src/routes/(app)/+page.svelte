<script lang="ts">
	import "@xyflow/svelte/dist/style.css";
	import Graph from "$lib/components/graph.svelte";
	import IconSpinner from "$lib/icons/icon-spinner.svelte";
	import { type Family } from "$lib/types.js";
	import { familiyStore } from "$lib/people.svelte.js";
	//import { invalidate } from "$app/navigation";
	import { apiFetch } from "$lib/utils.js";
	const { data } = $props();

	let count = $state(0);
	function getFamily(id: number) {
		return apiFetch<Family>(`/api/person?id=${id}`);
	}
</script>

<!--<button onclick={async () => {
	count++;
	const data = await getFamily(count);
	familiyStore.update((old) => { old.push(data); return old; });
}}>Fetch</button>-->

{#await data.person}
	<div class="graph">
		<div class="loading">
			<IconSpinner size={32} />
		</div>
	</div>
{:then value: Family}
	{#if !value}
		<p>No data</p>
	{:else}
		{familiyStore.update((old) => { old.push(value); return old; })}
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

		/*& span {
			padding: 1rem;
			gap: 1rem;
			border-radius: var(--wui-radius);
			background-color: var(--wui-background);
			box-shadow: var(--wui-box-shadow);
			border: 1px solid var(--wui-border);
			display: grid;
			place-items: center;
		}*/
	}
</style>
