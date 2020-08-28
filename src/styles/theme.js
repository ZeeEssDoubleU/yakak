import { DefaultTheme } from "react-native-paper";

//***********
// theme
//***********

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "hsla(206, 90%, 54%, 1.0)",
		primary_grad1: "#2196F3", // 30%
		primary_grad2: "#21CBF3", // 90%
		accent: "hsla(306, 2%, 14%, 1.0)",
		text_light: "white",
		text_medium: "hsla(109, 0%, 46%, 1.0)",
		surface: "white",
		surface_bg: "#f2f2f2",
		danger: "#d93f12",
		danger_grad1: "rgba(210, 48, 120, 1)", // 15%
		danger_grad2: "rgba(254, 97, 97, 1)", // 75%
		danger_grad3: "rgba(255, 121, 85, 1)", //100%
		danger_grad4: "#E9486D", // bg
	},
	fonts: {
		...DefaultTheme.fonts,
	},
	animation: {
		...DefaultTheme.animation,
	},
};
