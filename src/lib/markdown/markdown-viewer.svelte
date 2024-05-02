<script lang="ts">
  import plugins from "./plugins";
  import Markdown from "svelte-exmarkdown";

  interface Props {
    md?: string;
  }

  let { md = $bindable("") }: Props = $props();
</script>

<div class="markdown-render-body">
  <Markdown {md} {plugins} />
</div>
