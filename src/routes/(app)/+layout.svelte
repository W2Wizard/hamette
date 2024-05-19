<script lang="ts">
  import Modal from "$lib/components/modal.svelte";
  import EditPerson from "$lib/components/person-details.svelte";
  import EditRelationship from "$lib/components/person-relationships.svelte";
	import Overlay from "$lib/components/overlay.svelte";
	import Tab from "$lib/components/tab.svelte";
  import { ArrowRightStartOnRectangle, Bars3, Icon, PencilSquare, Plus, UserPlus,  } from "svelte-hero-icons";

	const { children } = $props();
  let modal: Modal;
  let modalEdit: Modal;
  let overlay: Overlay;
	let checked = $state(true);
	let route = $derived(checked ? "/person" : "/relationship");
</script>

<Overlay bind:this={overlay}/>

{#snippet editPerson()}
	<EditPerson />
	<hr />
	<button class="wui button" type="submit">
		<Icon src={Plus} solid size="22px" />
		Add
	</button>
{/snippet}

<Modal bind:this={modal} action="/person" method="post" title="Add new person">
	{@render editPerson()}
</Modal>

<Modal bind:this={modalEdit} action={route} method="post" title="Edit person">
	<Tab bind:checked  tabA="Person" tabB="Relationship"/>
	<hr />
	{#if checked}
		{@render editPerson()}
	{:else}
		<!--{@render editPerson()}-->
		<EditRelationship />
	{/if}
</Modal>

<header>
	<nav class="center">
    <menu style="gap: 8px;" class="center">
      <li>
        <button class="wui button" onclick={() => overlay.toggle()}>
          <Icon src={Bars3} solid size="20px" />
        </button>
      </li>
      <li>
        <button class="wui button" onclick={() => modal.toggle()}>
          <Icon src={UserPlus} solid size="20px" />
        </button>
      </li>
			<li>
				<button class="wui button" onclick={() => modalEdit.toggle()}>
					<Icon src={PencilSquare} solid size="20px" />
				</button>
			</li>
    </menu>
		<form method="post" action="/auth/logout">
			<button class="wui button" type="submit">
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
