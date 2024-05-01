<script lang="ts">
	//@ts-nocheck // HACK for broken toaster props
	import "../app.scss";
	import { Toaster } from "sonner-svelte";
	const { children } = $props();
</script>

{@render children()}
<Toaster closeButton richColors expand theme="system"/>
