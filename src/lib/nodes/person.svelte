<script lang="ts">
	import type { Writable } from "svelte/store";
	import { Handle, Position, type NodeProps } from "@xyflow/svelte";
	import type { Person } from "@prisma/client";
	import { DateTime } from "luxon";

	const bornOn = new Date().toISOString();
	const diedOn = new Date().toISOString();

	const { data }: Props = $props();
	interface Props extends NodeProps {
		data: { person: Person };
	}

	const { person } = data;
</script>

<div class="node" data-male="true">
	<Handle type="target" position={Position.Top} />
	<div class="content">
		<div id="left">
			<img
				src={person.picture}
				width="150"
				height="150"
				alt={`The picture of ${person.first_name} ${person.last_name}`}
			/>
		</div>

		<div id="right">
			<h1>{person.first_name}</h1>
			<p>Born on: {bornOn}</p>
			<p>Died on: {diedOn}</p>
		</div>
	</div>
	<Handle type="source" position={Position.Bottom} />
</div>

<style>
	div.content {
		display: grid;
		grid-template-columns: 0.3fr 1fr;
		gap: 0.5rem;
	}

	div.node {
		padding: 0.2rem;
		border-radius: 0.2rem;
		font-size: 0.7rem;
		border: 1px solid var(--wui-border);
		background-color: palevioletred;

		&[data-male="true"] {
			background-color: lightblue;
		}
	}
</style>
