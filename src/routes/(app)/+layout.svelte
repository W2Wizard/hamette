<script lang="ts">
  import Form from "$lib/components/form.svelte";
  import Modal from "$lib/components/modal.svelte";
	import Overlay from "$lib/components/overlay.svelte";
  import MarkdownEditor from "$lib/markdown/markdown-editor.svelte";
  import { useFileReader } from "$lib/utils";
  import toast from "sonner-svelte";
  import { ArrowRightStartOnRectangle, Bars3, Icon, Plus } from "svelte-hero-icons";

	const { children } = $props();
  let modal: Modal;
  let overlay: Overlay;
	let ppimg: HTMLImageElement;

	/**
	 * Handle image preview for adding a new person
	 * @param e Event
	 */
	function handleImagePreview(e: Event) {
		if (!e.target || !(e.target instanceof HTMLInputElement) || !e.target.files) {
			toast.error("Failed to show image preview, fire the junior dev!");
		}

		const target = e.target as HTMLInputElement;
		const file = target.files![0];
		if (!file || file.size > 1024 * 1024 * 5) {
			target.files = null;
			return toast.error("File too large!");
		} else if (!["image/png", "image/jpeg", "image/gif"].includes(file.type)) {
			target.files = null;
			return toast.error("Invalid file type!");
		}

		useFileReader(file).then((result) => (ppimg.src = result));
	}
</script>

<Overlay bind:this={overlay}/>

<Modal title="Add new person" bind:this={modal}>
  <Form>
		<!--<img src="https://via.placeholder.com/150" alt="Avatar" style="border-radius: 50%; width: 150px; height: 150px; margin: 0 auto; display: block;" />-->
		<div class="prof center">
			<img
				bind:this={ppimg}
				src="https://via.placeholder.com/150"
				width="150"
				height="150"
				alt="user avatar"
			/>
			<input
				type="file"
				title="Upload a profile picture (max 5MB, png, gif, jpeg)"
				accept="image/png, image/gif, image/jpeg"
				onchange={handleImagePreview}
			/>
		</div>

		<input class="wui" type="datetime-local">
		<input class="wui" type="time">

		<label for="first-name">First Name</label>
		<input class="wui" type="text" name="first-name" id="first-name" required />

		<label for="last-name">Last Name</label>
		<input class="wui" type="text" name="last-name" id="last-name" required />

		<label for="born-on">Born on</label>
		<input class="wui" type="datetime" name="born-on" id="born-on" required />

		<label for="email">Died on</label>
		<input class="wui" type="datetime" name="died-on" id="died-on" />

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

	div.prof {
		--width: 128px;
		--height: 128px;
		flex-direction: column;
		gap: 8px;

		& img {
			border-radius: 50%;
			height: var(--height);
			width: var(--width);
			pointer-events: none;
			user-select: none;
			background-color: var(--wui-shade-01);
		}

		& input[type="file"] {
			color: transparent;
			width: var(--width);

			&::file-selector-button {
				border: 2px solid var(--wui-border);
				border-radius: var(--wui-radius);
				background-color: var(--wui-shade-01);
				padding: 8px;
				cursor: pointer;
				margin: 0;
				width: var(--width);
				color: var(--wui-foreground);

				&:hover {
					background-color: var(--wui-shade-02);
				}
			}
		}
	}
</style>
