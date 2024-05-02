<script lang="ts">
  import type { Writable } from "svelte/store";
  import { Handle, Position, type NodeProps } from "@xyflow/svelte";
  import type { Person } from "@prisma/client";

  const { person }: Props = $props();
  interface Props extends NodeProps {
    person: Writable<Person>;
  }
</script>

<div>
  <Handle type="source" position={Position.Left} />
  <h1>Hello!</h1>
  <Handle type="target" position={Position.Right} />
</div>

<style>
  div {
    padding-inline: 1rem;
    border-radius: 0.2rem;
    font-size: 0.7rem;
    background-color: var(--wui-shade-01);
  }
</style>
