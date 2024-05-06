<script lang="ts">
	import { Handle, Position, type NodeProps } from "@xyflow/svelte";
	import type { Person } from "@prisma/client";

	const bornOn = new Date().toISOString();
	const diedOn = new Date().toISOString();

	const { data }: Props = $props();
	interface Props extends NodeProps {
		data: { person: Person | null };
	}

	const { person } = data;
</script>

<div class="node" data-male={person?.male ?? "unknown"}>
	<Handle type="target" position={Position.Top} />
	<div class="content">
		<div id="left">
			<img
				src={person?.picture ?? "https://via.placeholder.com/150"}
				width="64px"
				height="64px"
				alt={`The picture of ${person?.first_name ?? "unknown"} ${person?.last_name ?? "unknown"}`}
			/>
		</div>

		<div id="right">
			{#if person}
				<h1>{person.first_name} {person.middle_name} {person.last_name}</h1>
			{:else}
				<h1>Unknown</h1>
			{/if}
			<p>Born on: {bornOn}</p>
			<p>Died on: {diedOn}</p>
		</div>
	</div>
	<Handle id="offspring" type="source" position={Position.Bottom} />
	<Handle id="relation" type="target" position={Position.Bottom} />
</div>

<style>
	div.content {
		display: grid;
		grid-template-columns: 0.3fr 1fr;
		gap: 0.5rem;
	}

	img {
		width: 64px;
		height: 64px;
	}

	div.node {
		padding: 0.2rem;
		border-radius: 0.2rem;
		font-size: 0.7rem;
		border: 1px solid var(--wui-border);
		background-color: palevioletred;

		&[data-male="1"] {
			background-color: lightblue;
		}

		&[data-male="unknown"] {
			background-color: gray;
		}
	}
</style>
