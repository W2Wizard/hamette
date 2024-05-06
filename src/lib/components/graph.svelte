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

	const { ...rest } = $props();
	const edges = writable<SvelteFlowEdge[]>([]);
	const nodes = writable<SvelteFlowNode[]>([]);

	function addNode(data: PersonType, position?: XYPosition) {
		nodes.update((old) => [
			...old,
			{
				id: data.id.toString(),
				type: "person",
				data: { person: data },
				position: position ?? { x: 0, y: 0 },
			},
		]);
	}

	function addEdge(
		source: string,
		target: string,
		type?: "relation" | "offspring",
	) {
		edges.update((old) => [
			...old,
			{
				id: `${source}-${target}-edge`,
				source,
				target,
				targetHandle: type,
				type: "smoothstep",
			},
		]);
	}

	familiyStore.subscribe((families) => {
		// A family consists of a person and their spouses with their children
		// We need to create a node for each person in the family and connect them with edges
		// Spouses connect to their children always including the patriach of the family.
		// Spouses do not connect to the patriach of the family.

		// Value consists of all the loaded families so far including ones we already loaded
		families.forEach((family, i) => {
			const head = family.person;
			const headID = head.id.toString();
			const position = { x: i * 200, y: i * 200 };
			let k = 0;

			addNode(head, position)

			family.spouses.forEach((spouse, j) => {
				const person = spouse.person!;
				const spouseID = person.id.toString();
				const position2 = { x: position.x + j * 300 + 300, y: position.y };
				addNode(person, position2);
				addEdge(headID, spouseID, "relation");

				spouse.children.forEach((child) => {
					addNode(child, { x: position2.x + k * 150, y: position.y + 120 });
					addEdge(headID, child.id.toString());
					addEdge(spouseID, child.id.toString());
					k++;
				});
			});
		});
	});

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
	nodesDraggable={true}
	{...rest}
>
	<Controls />
	<Background variant={BackgroundVariant.Dots} />
</SvelteFlow>
