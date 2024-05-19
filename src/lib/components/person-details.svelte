<script lang="ts">
	import MarkdownEditor from "$lib/markdown/markdown-editor.svelte";
	import toast from "sonner-svelte";
	import { useFileReader } from "$lib/utils";
	import type { Person } from "@prisma/client";

	const { initial }: { initial?: Person } = $props();
	let ppimg: HTMLImageElement;

	$effect(() => {
		if (initial?.picture) {
			ppimg.src = initial.picture;
		}
	});

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

<div>
	<div class="center" style="gap: 8px;">
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
				name="picture"
				title="Upload a profile picture (max 5MB, png, gif, jpeg)"
				accept="image/png, image/gif, image/jpeg"
				onchange={handleImagePreview}
			/>
		</div>

		<div class="group">
			<label for="first-name" title="The first name of the person">
				First Name<sub>*</sub>
				<input
					class="wui"
					type="text"
					name="first-name"
					id="first-name"
					title="Please enter a valid name"
					value={initial?.first_name ?? ""}
					required
				/>
			</label>

			<label for="middle-name" title="The middle name of the person">
				Middle Name
				<input
					class="wui"
					type="text"
					name="middle-name"
					id="middle-name"
					value={initial?.middle_name ?? ""}
					title="Please enter a valid name"
				/>
			</label>

			<label for="last-name" title="The last name of the person">
				Last Name<sub>*</sub>
				<input
					class="wui"
					type="text"
					name="last-name"
					id="last-name"
					value={initial?.last_name ?? ""}
					title="Please enter a valid name"
					required
				/>
			</label>

			<label for="gender" title="The gender of the person">
				Gender<sub>*</sub>
				<select
					required
					id="gender"
					name="gender"
					class="wui"
					value={initial?.male ? "male" : "female" ?? "male"}
				>
					<option value="male">Male</option>
					<option value="female">Female</option>
				</select>
			</label>

			<label for="birth-date" title="The date of birth">
				Born on<sub>*</sub>
				<input
					class="wui"
					type="date"
					name="birth-date"
					id="birth-date"
					value={initial?.born_at}
					required
				/>
			</label>

			<label for="death-date" title="Leave empty if still alive">
				Died on
				<input
					class="wui"
					type="date"
					name="death-date"
					id="death-date"
					value={initial?.died_at}
				/>
			</label>

			<label
				for="occupation"
				title="The current / last occupation of the person"
			>
				Occupation
				<input
					class="wui"
					type="text"
					name="occupation"
					id="occupation"
					value={initial?.occupation ?? ""}
				/>
			</label>

			<label
				for="birth-place"
				title="The place of birth (url to openstreetmap)"
			>
				Birth Place
				<input
					class="wui"
					type="url"
					name="birth-place"
					id="birth-place"
					pattern="https://.*"
					title="Please enter a valid URL, e.g: OpenStreetMap URL"
					placeholder="https://www.openstreetmap.org/#map=16/52.4809/4.9723&layers=N"
					value={initial?.birthplace ?? ""}
				/>
			</label>
		</div>
	</div>

	<hr />
	<label for="biography" title="The biography of the person">Biography</label>
	<MarkdownEditor
		class="wui"
		name="biography"
		id="biography"
		value={initial?.bio ?? ""}
	/>
</div>

<style>
	div.prof {
		--width: 128px;
		--height: 128px;
		flex-direction: column;
		gap: 8px;

		& img {
			border-radius: var(--wui-radius);
			height: var(--height);
			width: var(--width);
			pointer-events: none;
			user-select: none;
			background-color: var(--wui-shade-01);
		}

		& input[type="file"] {
			color: transparent;
			width: var(--width);

			&:hover {
				&::file-selector-button {
					background-color: var(--wui-shade-02);
				}
			}

			&::file-selector-button {
				border: 1px solid var(--wui-border);
				border-radius: var(--wui-radius);
				background-color: var(--wui-shade-01);
				padding: 8px;
				cursor: pointer;
				margin: 0;
				width: var(--width);
				color: var(--wui-foreground);
			}
		}
	}
</style>
