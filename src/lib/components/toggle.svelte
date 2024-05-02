<script lang="ts">
  import type { HTMLButtonAttributes } from "svelte/elements";

  let { toggled = $bindable(false), ...rest }: Props = $props();
  interface Props extends HTMLButtonAttributes {
    toggled?: boolean;
  }
</script>

<button
  onclick={() => (toggled = !toggled)}
  role="checkbox"
  aria-checked={toggled ? "true" : "false"}
  {...rest}
></button>

<style>
  button {
    --br: 10px;
    --size: 1.25em;
    --bg: var(--wui-shade-05);
    --fg: rgba(255, 255, 255, 0.906);
    --bg-active: var(--bg);
    --fg-active: var(--fg);

    position: relative;
    height: var(--size);
    width: 2rem;
    border-radius: var(--br);
    appearance: none;
    border: transparent;
    cursor: pointer;
  }

  button::before {
    content: "";
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
    border-radius: var(--size);
    top: 0;
    left: 0;
    border-radius: var(--br);
    background: var(--bg);
    box-sizing: border-box;
    transition: background 0.2s ease-out;
    box-shadow: var(--wui-box-shadow);
  }

  button:disabled {
    cursor: not-allowed;
    background: var(--wui-shade-02);
  }

  button[aria-checked="true"]::before {
    background: var(--wui-primary);
  }

  button::after {
    content: "";
    position: absolute;
    display: block;
    width: calc(var(--size) - 4px);
    height: calc(var(--size) - 4px);
    aspect-ratio: 1;
    top: 2px;
    left: 2px;
    border-radius: 50%;
    background: var(--fg);
    transition:
      background 0.2s ease-out,
      left 0.2s ease-out;
  }

  button[aria-checked="true"]::after {
    background: var(--fg-active);
    left: calc(100% - var(--size) + 2px);
  }
</style>
