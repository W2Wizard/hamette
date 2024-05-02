<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  
    interface Props extends NodeProps {
        color: Writable<string>;
    }

    const { color }: Props = $props();
  </script>
  
  <div class="colorpicker">
    <Handle type="target" position={Position.Left} />
    <div>
      color: <strong>{$color}</strong>
    </div>
    <input
      class="nodrag"
      type="color"
      oninput={(evt) => color.set(evt.currentTarget?.value)}
      value={$color}
    />
    <Handle type="source" position={Position.Right} />
  </div>
  
  <style>
    .colorpicker {
      padding: 1rem;
      background: #eee;
      border-radius: 0.125rem;
      font-size: 0.7rem;
    }
  </style>