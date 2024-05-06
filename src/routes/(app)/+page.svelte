<script lang="ts">
	import "@xyflow/svelte/dist/style.css";
	import Graph from "$lib/components/graph.svelte";
	import IconSpinner from "$lib/icons/icon-spinner.svelte";

	const { data } = $props();
</script>

{#await data.streamed.one}
	<div class="graph">
		<div class="loading">
			<IconSpinner size={32} />
		</div>
	</div>
{:then value}
	{#if !value}
		<p>No data</p>
	{:else}
		<Graph people={[value]} />
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
