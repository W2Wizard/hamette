<script lang="ts">
	const { children } = $props();
</script>

<div class="bg-image"></div>

<div class="page">
	<div class="section left">
		<div class="content">
			<!--<img
				alt="Codam Coding College logo"
				src="https://apply.codam.nl/uploads/admissions/campus/logo_website/6/logo_codam_black.svg"
				style="max-width: 100%; width: auto; height: 95px; z-index: 99"
			/>-->
			<h1>Welcome</h1>
			<h2>Hamette Graph</h2>
			<hr />
			{@render children()}
		</div>
	</div>

	<div class="section right" />
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		padding: 3rem 2rem;
		gap: 6px;

		& img {
			align-self: flex-start;
		}

		& h1,
		h2 {
			text-transform: uppercase;
		}

		& h1 {
			font-size: 4rem;
			font-weight: 700;
			color: #ff5a5f;

			&::before {
				content: " ";
				display: block;
				width: 120px;
				height: 6px;
				background: #ff5a5f;
			}
		}
	}

	.page {
		position: relative;
		display: flex;
		align-items: center;
		height: 100vh;
		width: 100%;
		color: var(--wui-foreground);

		& .section {
			flex: 1;
			height: 100%;
			padding: 2rem;
			min-width: 400px;
		}

		& .left {
			flex: 0.25;
			display: grid;
			place-items: center;

			grid-template-columns: minmax(200px, 1fr);
			background-color: var(--wui-shade-02);
		}

		& .right {
			flex: 0.75;
			//backdrop-filter: blur(1px);
			border-left: 1px solid #4a4a4a3a;
		}
	}

	.bg-image {
		position: absolute;
		height: 100dvh;
		width: 100%;
		background-image: url("");
		background-size: cover;
		background-position: right;
		background-repeat: no-repeat;
	}
</style>
