<script lang="ts">
	import Person from "$lib/nodes/person.svelte";
	import { type GETPerson } from "../types";
	import {
		Background,
		BackgroundVariant,
		Controls,
		SvelteFlow,
		type Node as SvelteFlowNode,
		type Edge as SvelteFlowEdge,
	} from "@xyflow/svelte";
	import "@xyflow/svelte/dist/style.css";
	import { writable } from "svelte/store";

	interface Props {
		people: GETPerson[];
	}
	const { people, ...rest }: Props = $props();

	const edges = writable<SvelteFlowEdge[]>([]);
	const nodes = writable<SvelteFlowNode[]>(people.map((person, i) => ({
		id: i.toString(),
		type: "person",
		data: { person: person.person },
		position: { x: i, y: i },
	})));

	const nodeTypes = {
		person: Person,
	};
</script>

<SvelteFlow
	style="
		border-radius: var(--wui-radius);
		height: calc(100dvh - var(--main-padding) - var(--wui-header-height));
		box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 4px 2px inset;
	"
	{nodes}
	{edges}
	{nodeTypes}
	fitView
	{...rest}
>
	<Controls />
	<Background variant={BackgroundVariant.Dots} />
</SvelteFlow>
