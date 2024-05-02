<script lang="ts">
    import Form from "$lib/components/form.svelte";
    import Modal from "$lib/components/modal.svelte";
import Overlay from "$lib/components/overlay.svelte";
    import MarkdownEditor from "$lib/markdown/markdown-editor.svelte";
    import { ArrowRightStartOnRectangle, Bars3, Icon, Plus } from "svelte-hero-icons";

	const { children } = $props();
    let overlay: Overlay;
    let modal: Modal;
</script>

<Overlay bind:this={overlay}/>

<Modal title="Add new person" bind:this={modal}>
    <Form>
        <label for="name">Name</label>
        <input class="wui" type="text" name="name" id="name" required />

        <label for="email">Email <sub>*</sub></label>
        <input class="wui" type="email" name="email" id="email" required />

        <label for="notes">Notes</label>
        <MarkdownEditor class="wui" name="notes" id="notes" />
        <hr />
        <button class="wui button" type="submit" style="width: 100%; justify-content: center;">
            Add
        </button>
    </Form>

</Modal>

<header>
	<nav class="center">
        <menu style="gap: 8px;" class="center">
            <li>
                <button class="wui button" onclick={() => overlay.toggle()}>
                    <Icon src={Bars3} solid size="22px" />
                </button>
            </li>
            <li>
                <button class="wui button" onclick={() => modal.toggle()}>
                    <Icon src={Plus} solid size="22px" />
                </button>
            </li>
        </menu>
		<form method="post" action="/auth/logout">
			<button class="wui button" type="submit">
				Sign out
				<Icon src={ArrowRightStartOnRectangle} solid size="22px" />
			</button>
		</form>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style lang="scss">
	header {
		display: grid;
		background-color: var(--wui-header);
		width: 100%;
		height: var(--wui-header-height);
		padding-inline: 1rem;
	}
	
	main {
		--main-padding: 1rem;
		padding-inline: var(--main-padding);
	}

	nav {
		justify-content: space-between;
	}

</style>
