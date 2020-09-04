import React from "react";
import { Dimensions } from "react-native";
import { DefaultTheme } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { getStatusBarHeight } from "react-native-status-bar-height";
// import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
// import providers
import { Provider as MuiProvider } from "react-native-paper";
import { ThemeProvider as ScProvider } from "styled-components/native";
// get dimensions
const { height: HEIGHT, width: WIDTH } = Dimensions.get("window");
const STATUSBAR_HEIGHT = getStatusBarHeight();

//***********
// theme
//***********

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "hsla(206, 90%, 54%, 1.0)",
		primary_grad1: "hsla(206, 90%, 54%, 1.0)", // 30%
		primary_grad2: "hsla(191, 90%, 54%, 1.0)", // 90%
		accent: "hsla(306, 2%, 14%, 1.0)",
		text_light: "white",
		text_medium: "hsla(109, 0%, 46%, 1.0)",
		surface: "white",
		surface_bg: "hsla(106, 0%, 95%, 1.0)", // #f2f2f2
		danger: "hsla(346, 78%, 60%, 1.0)", // old - #d93f12
		danger_grad1: "hsla(333, 64%, 50%, 1.0)", // 15%
		danger_grad2: "hsla(360, 99%, 69%, 1.0)", // 75%
		danger_grad3: "hsla(13, 100%, 67%, 1.0)", //100%
		danger_grad4: "hsla(346, 78%, 60%, 1.0)", // bg
		status_bar_dark: StatusBar.dark,
		status_bar_light: StatusBar.light,
	},
	fonts: {
		...DefaultTheme.fonts,
	},
	icons: {
		profile: "user",
		add: "plus",
		remove: "minus",
		close: "close",
		back: "chevron-left",
		back_heavy: "arrow-left",
		scroll_down: "chevron-down",
		forward: "chevron-right",
		send: "sc-telegram",
		eye_open: "eye",
		eye_shut: "eye",
		add_photo: "camera",
	},
	sizes: {
		window_height: HEIGHT,
		window_width: WIDTH,
		window_padding: 16,
		statusbar_height: STATUSBAR_HEIGHT,
		icon_sm: 28,
		icon_md: 32,
		icon_lg: 40,
		nav_header: 20,
		nav_font: 20,
		avatar: WIDTH / 2.75,
		avatar_border_radius: 12,
		banner: HEIGHT / 4.5,
		bottom_button_padding: 36,
	},
	animation: {
		...DefaultTheme.animation,
	},
};

//***********
// provider
//***********

export const ThemeProvider = ({ children }) => {
	return (
		<MuiProvider
			{...{ theme }}
			settings={{
				icon: (props) => <EvilIcons {...props} />,
			}}
		>
			<ScProvider {...{ theme }}>{children}</ScProvider>
		</MuiProvider>
	);
};
