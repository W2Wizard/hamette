<script lang="ts">
	import { Icon, XMark } from "svelte-hero-icons";
	import type { HTMLFormAttributes } from "svelte/elements";
	import Form from "./form.svelte";

	let modal: HTMLDialogElement;

    interface Props extends HTMLFormAttributes {}
    const { title = "Modal", children,  ...rest }: Props = $props();;

    export const show = () => modal.showModal();
    export const close = () => modal.close();
    export const toggle = () => modal.open ? close() : show();
</script>

<dialog bind:this={modal}>
	<Form method="post" {...rest}>
		<div>
			<!--<h1>{$$props.title}</h1>-->
            <h1>{title}</h1>
			<!-- NOTE: Using formmethod="dialog" is fucked here -->
			<!-- Reset here actually helps us yeet all the data -->
			<button title="Close this modal" class="center" type="reset" onclick={close}>
				<Icon src={XMark} solid size="24" />
			</button>
		</div>
		<hr />
        {#if children}
            {@render children()}
        {/if}
	</Form>
</dialog>

<style>
	div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 2rem;

		& h1 {
			padding: 0;
			font-size: 1.5rem;
			font-weight: 400;
			color: var(--wui-foreground);
			text-align: center;
		}

		& button {
			background: transparent;
			border: none;
			cursor: pointer;
			color: var(--wui-foreground);
			padding: 4px;
			border-radius: var(--wui-radius);

			&:hover {
				background-color: var(--wui-shade-03);
			}
		}
	}

	dialog {
    margin: 0;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 1;
		color: var(--wui-foreground);
		background: var(--wui-shade-01);
		border: 1px solid var(--wui-border);
		box-shadow: var(--wui-box-shadow);
		border-radius: var(--wui-radius);
		padding: 15px;
    width: 42rem;
		min-height: 50dvh;

		&[open] {
			animation: slidein 0.35s ease-in-out;
		}

		&::backdrop {
			background: rgba(0, 0, 0, 0.35);
			animation: fadein 0.35s ease-in-out;
		}
	}

	@keyframes fadein {
		from {
			background: rgba(0, 0, 0, 0);
		}
		to {
			background: rgba(0, 0, 0, 0.35);
		}
	}

	@keyframes slidein {
		from {
			transform: translate(-50%, -200%);
			opacity: 0;
		}
		to {
			transform: translate(-50%, -50%);
			opacity: 1;
		}
	}
</style>
