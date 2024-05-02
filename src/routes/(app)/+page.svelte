<script>
  import { Background, Controls, SvelteFlow } from "@xyflow/svelte";
  import "@xyflow/svelte/dist/style.css";
  import { writable } from "svelte/store";
  import Person from "$lib/nodes/person.svelte";

  const nodes = writable([
    {
      id: "1",
      type: "person",
      data: { person: writable("#ff4000") },
      position: { x: 0, y: 0 },
    },
    {
      id: "2",
      type: "default",
      data: { label: "Node" },
      position: { x: 0, y: 150 },
    },
  ]);

  const edges = writable([]);

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
>
  <Controls />
  <Background variant="dots" />
</SvelteFlow>

<!--<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
  } from "@xyflow/svelte";

  // 👇 this is important! You need to import the styles for Svelte Flow to work
  import "@xyflow/svelte/dist/style.css";
  import { clientWritable } from "$lib/utils";
  import Person from "$lib/nodes/person.svelte";

  // We are using writables for the nodes and edges to sync them easily. When a user drags a node for example, Svelte Flow updates its position.
  const nodes = clientWritable([
    {
      id: "1",
      type: "input",
      data: { label: "Input Node" },
      position: { x: 0, y: 0 },
    },
    {
      id: "2",
      type: "default",
      data: { label: "Node" },
      position: { x: 0, y: 150 },
    },
  ]);

  // same for edges
  const edges = clientWritable([
    {
      id: "1-2",
      type: "default",
      source: "1",
      target: "2",
      label: "Edge Text",
    },
  ]);

  const nodeTypes = {
    colorPicker: Person
  };
</script>

<SvelteFlow
  {nodes}
  {edges}
  nodeTypes={{
    "colorPicker": Person
  }}
  snapGrid={[25, 25]}
  fitView
  style="border-radius: var(--wui-radius); height: calc(100dvh - var(--main-padding) - var(--wui-header-height))"
  on:nodeclick={(event) => console.log("on node click", event.detail.node)}
>
  <Controls />
  <Background variant={BackgroundVariant.Dots} />
</SvelteFlow>-->
