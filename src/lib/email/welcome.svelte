<script lang="ts">
	import {
		Button,
		Container,
		Head,
		Hr,
		Html,
		Img,
		Preview,
		Section,
		Text
	} from "svelte-email";
	import { Styles } from "./styles";

	export let firstName = "John";
</script>

<Html lang="en">
	<Head />
	<Preview preview="Welcome to svelte-email" />
	<Section style={Styles.main}>
		<Container style={Styles.container}>
			<Img
				src="https://svelte.dev/svelte-logo-horizontal.svg"
				alt="Svelte logo"
				style={Styles.logo}
				width="200"
				height="50"
			/>
			<Text style={Styles.paragraph}>{firstName}, welcome to svelte-email</Text>
			<Text style={Styles.paragraph}
				>A Svelte component library for building responsive emails</Text
			>
			<Section style={Styles.btnContainer}>
				<Button
					pX={12}
					pY={12}
					style={Styles.button}
					href="https://github.com/carstenlebek/svelte-email"
				>
					View on GitHub
				</Button>
			</Section>
			<Text style={Styles.paragraph}>Happy coding!</Text>
			<Hr style={Styles.hr} />
			<Text style={Styles.footer}>Carsten Lebek</Text>
		</Container>
	</Section>
</Html>
