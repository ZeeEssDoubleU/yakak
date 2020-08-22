import { DefaultTheme } from "react-native-paper";

//***********
// theme
//***********

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "hsla(206, 90%, 54%, 1.0)",
		accent: "hsla(306, 2%, 14%, 1.0)",
		text_light: "white",
		text_medium: "hsla(109, 0%, 46%, 1.0)",
		surface: "white",
		surface_bg: "#f2f2f2",
		danger: "#d93f12",
	},
	fonts: {
		...DefaultTheme.fonts,
	},
	animation: {
		...DefaultTheme.animation,
	},
};
