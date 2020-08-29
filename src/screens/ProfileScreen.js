import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Avatar, useTheme, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { useActionSheet } from "@expo/react-native-action-sheet";
// import components
import FormButton from "../components/Form/FormButton";
import KeyboardAvoidingView from "../components/Keyboard/KeyboardAvoidingView";
// import context
import { useAuth } from "../context/Auth";

//***********
// component
//***********

// add banner placeholder
// integrate expo-image-pickr
// integrate into avatar

export default function ProfileScreen() {
	const theme = useTheme();
	const [userDetails, setUserDetails] = useState({
		display_name: "Bob Johnson",
		about:
			"I am the fastest man alive!  I'm so fast, that I can alter the rotation of the earth.",
	});

	const { user, logout } = useAuth();
	// console.log("user:", user); // ? debug

	const { showActionSheetWithOptions } = useActionSheet();

	const logoutActions = () => {
		showActionSheetWithOptions(
			{
				message: "Are you sure you want to logout?",
				options: ["Logout", "Cancel"],
				cancelButtonIndex: 1,
				destructiveButtonIndex: 0,
			},
			(buttonIndex) => {
				if (buttonIndex === 0) return logout();
				else if (buttonIndex === 1) return null;
			},
		);
	};

	return (
		<KeyboardAvoidingView>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				style={styles.scrollView}
				centerContent
			>
				<Avatar.Image style={styles.banner} />
				<View style={styles.detailsWrapper}>
					<View style={styles.translateWrapper}>
						<View style={styles.avatarWrapper}>
							<Avatar.Image
								color={theme.colors.danger}
								style={styles.avatar}
							/>
						</View>
						<TextInput
							label="Display name (optional)"
							value={userDetails.display_name}
							mode="outlined"
							style={styles.details}
						/>
						<TextInput
							label="Email"
							value={user.email}
							mode="outlined"
							disabled
							style={styles.details}
						/>
						<TextInput
							label="About (optional)"
							value={userDetails.about}
							mode="outlined"
							multiline
							style={styles.details}
						/>
					</View>
					<FormButton
						style={styles.logout}
						title="Logout"
						mode="contained"
						color={theme.colors.danger}
						onPress={logoutActions}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

//***********
// styles
//***********

import { theme } from "../styles/theme";
const styles = StyleSheet.create({
	avatar: {
		width: theme.sizes.avatar - 6 * 2,
		height: theme.sizes.avatar - 6 * 2,
		borderRadius: theme.sizes.avatar - 6 * 2,
	},
	avatarWrapper: {
		alignItems: "center",
		justifyContent: "center",
		left: theme.sizes.window_padding,
		width: theme.sizes.avatar,
		height: theme.sizes.avatar,
		borderRadius: theme.sizes.avatar - 6 * 2,
		backgroundColor: theme.colors.surface_bg,
	},
	banner: {
		height: theme.sizes.banner,
		width: theme.sizes.window_width,
		borderRadius: 0,
	},
	container: {
		flex: 1,
		height: theme.sizes.window_height - 400,
	},
	details: {
		marginHorizontal: theme.sizes.window_padding,
		marginVertical: theme.sizes.window_padding,
		borderRadius: 4,
		fontSize: 14,
	},
	detailsWrapper: {
		flex: 1,
	},
	logout: {
		alignSelf: "center",
		bottom: 36,
	},
	scrollView: {
		flex: 1,
	},
	translateWrapper: {
		flex: 1,
		top: -theme.sizes.avatar / 2,
		width: theme.sizes.window_width,
	},
});
