<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends HTMLInputAttributes {
		checked?: boolean;
		tabA?: string;
		tabB?: string;
	}

	let {
		checked = $bindable(true),
		tabA = "A",
		tabB = "B",
		...rest
	}: Props = $props();
</script>

<div>
	<label for="tab-a" class="select">
		<input
			type="radio"
			id="tab-a"
			value="a"
			name="tab"
			checked
			onchange={() => (checked = true)}
			{...rest}
		/>
		<p>{tabA}</p>
	</label>

	<label for="tab-b" class="select">
		<input
			type="radio"
			id="tab-b"
			name="tab"
			value="b"
			onchange={() => (checked = false)}
			{...rest}
		/>
		<p>{tabB}</p>
	</label>
</div>

<style>
	div {
		display: flex;
		gap: 8px;
		padding: 4px;
		border-radius: var(--wui-radius);
		border: 1px solid var(--wui-border);
		background-color: var(--wui-shade-01);

		& input {
			display: none;
		}

		& label {
			flex: 1;
			background-color: transparent;
			padding: 6px;
			cursor: pointer;
			border-radius: var(--wui-radius);
			transition: background-color 0.2s;
			text-align: center;
			color: var(--wui-text-01);

			&:hover {
				background-color: var(--wui-shade-02);
			}

			&:focus-visible {
				/*outline: var(--outline);
				outline-offset: var(--outline-offset);*/
				background-color: var(--wui-shade-02);
			}

			&:has(input:checked) {
				background-color: var(--wui-shade-03);
			}
		}
	}
</style>
