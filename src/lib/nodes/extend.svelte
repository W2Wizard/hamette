<script lang="ts">
    import { Handle, Position, type NodeProps } from '@xyflow/svelte';
	import { Icon, Plus } from 'svelte-hero-icons';
	import Form from '$lib/components/form.svelte';

    interface Props extends NodeProps {
			personID: string;
    }

    const { personID }: Props = $props();
  </script>

  <Form method="post" action="/?person={personID}">
    <Handle type="target" position={Position.Top} />
		<button type="submit" class="wui button">
			<Icon src={Plus} size="16px"/>
		</button>
    <!--<div>
      color: <strong>{$color}</strong>
    </div>
    <input
      class="nodrag"
      type="color"
      oninput={(evt) => color.set(evt.currentTarget?.value)}
      value={$color}
    />-->
    <!--<Handle type="source" position={Position.Right} />-->
  </Form>

  <style>

  </style>
