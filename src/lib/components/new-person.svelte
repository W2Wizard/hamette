<script lang="ts">
	import MarkdownEditor from "$lib/markdown/markdown-editor.svelte";
	import toast from "sonner-svelte";
	import Form from "./form.svelte";
	import { useFileReader } from "$lib/utils";

	let ppimg: HTMLImageElement;

	/**
	 * Handle image preview for adding a new person
	 * @param e Event
	 */
	function handleImagePreview(e: Event) {
		if (
			!e.target ||
			!(e.target instanceof HTMLInputElement) ||
			!e.target.files
		) {
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

<Form method="post" action="/person">
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

	<div class="group">
		<label for="first-name">
			First Name<sub>*</sub>
			<input
				class="wui"
				type="text"
				name="first-name"
				id="first-name"
				required
			/>
		</label>

		<label for="middle-name">
			Middle Name
			<input class="wui" type="text" name="middle-name" id="middle-name" />
		</label>

		<label for="last-name">
			Last Name<sub>*</sub>
			<input class="wui" type="text" name="last-name" id="last-name" required />
		</label>

		<label for="born-on">
			Born on<sub>*</sub>
			<input class="wui" type="date" name="born-on" id="born-on" required />
		</label>

		<label for="email">
			Died on
			<input class="wui" type="date" name="died-on" id="died-on" />
		</label>
	</div>

	<label for="notes">Notes</label>
	<MarkdownEditor class="wui" name="notes" id="notes" />
	<hr />
	<button
		class="wui button"
		type="submit"
		style="width: 100%; justify-content: center;"
	>
		Add
	</button>
</Form>

<style>
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
