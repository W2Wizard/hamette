export namespace Styles {
	export const fontFamily =
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif';

	export const main = {
		backgroundColor: "#ffffff",
	};

	export const container = {
		margin: "0 auto",
		padding: "20px 0 48px",
	};

	export const logo = {
		margin: "0 auto",
	};

	export const paragraph = {
		fontFamily,
		fontSize: "16px",
		lineHeight: "26px",
	};

	export const btnContainer = {
		textAlign: "center" as const,
	};

	export const button = {
		fontFamily,
		backgroundColor: "#5F51E8",
		borderRadius: "3px",
		color: "#fff",
		fontSize: "16px",
		textDecoration: "none",
		textAlign: "center" as const,
		display: "block",
	};

	export const hr = {
		borderColor: "#cccccc",
		margin: "20px 0",
	};

	export const footer = {
		fontFamily,
		color: "#8898aa",
		fontSize: "12px",
	};
}
