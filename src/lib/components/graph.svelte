<script lang="ts">
	import Person from "$lib/nodes/person.svelte";
	import type { Person as PersonType } from "@prisma/client";
	import { familiyStore } from "$lib/people.svelte";
	import {
		Background,
		BackgroundVariant,
		Controls,
		SvelteFlow,
		type Node as SvelteFlowNode,
		type Edge as SvelteFlowEdge,
		type XYPosition,
	} from "@xyflow/svelte";
	import "@xyflow/svelte/dist/style.css";
	import { writable } from "svelte/store";
	import Extend from "$lib/nodes/extend.svelte";

	const { ...rest } = $props();
	const edges = writable<SvelteFlowEdge[]>([]);
	const nodes = writable<SvelteFlowNode[]>([]);


	familiyStore.subscribe((families) => {
		// A family consists of a person and their spouses with their children
		// We need to create a node for each person in the family and connect them with edges
		// Spouses connect to their children always including the patriach of the family.
		// Spouses do not connect to the patriach of the family.

		// Value consists of all the loaded families so far including ones we already loaded
		families.forEach((family, i) => {
			const head = family.person;
			const position = { x: i * 200, y: i * 200 };

			$nodes.push({
				id: head.id.toString(),
				type: "person",
				position,
				data: { person: head },
			});

			$nodes.push({
				id: `extend-${head.id}`,
				type: "extend",
				position: { x: position.x + 118, y: position.y + 100 },
				data: { personID: head.id.toString() },
			});

			$edges.push({
				id: `edge-${head.id}`,
				source: head.id.toString(),
				target: `extend-${head.id}`,
			});

			//addNode(`22`, undefined, { x: position.x + 100, y: position.y + 100 }, "extend");
		});
	});

	const nodeTypes = {
		person: Person,
		extend: Extend,
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
	snapGrid={[3, 3]}
	nodesDraggable={true}
	{...rest}
>
	<Controls />
	<Background variant={BackgroundVariant.Dots} />
</SvelteFlow>
