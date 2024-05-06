<script lang="ts">
	const { size = 16 } = $props();
</script>

<svg
	width={size}
	height={size}
	stroke=" var(--wui-primary)"
	viewBox="0 0 24 24"
	xmlns="http://www.w3.org/2000/svg"
>
	<g class="spinner">
		<circle cx="12" cy="12" r="9.5" fill="none" stroke-width="3"></circle>
	</g>
</svg>

<style>
	.spinner {
		transform-origin: center;
		animation: spinner_a 2s linear infinite;

		& circle {
			stroke-linecap: round;
			animation: spinner_b 1.5s ease-in-out infinite;
		}
	}

	@keyframes spinner_a {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes spinner_b {
		0% {
			stroke-dasharray: 0 150;
			stroke-dashoffset: 0;
		}
		47.5% {
			stroke-dasharray: 42 150;
			stroke-dashoffset: -16;
		}
		95%,
		100% {
			stroke-dasharray: 42 150;
			stroke-dashoffset: -59;
		}
	}
</style>
