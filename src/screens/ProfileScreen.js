import React, { useContext, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Avatar, useTheme, TextInput } from "react-native-paper";
import styled from "styled-components/native";
import { useActionSheet } from "@expo/react-native-action-sheet";
// import components
import FormButton from "../components/Form/FormButton";
import KeyboardAvoidingView from "../components/Keyboard/KeyboardAvoidingView";
// import context
import { useAuth } from "../context/Auth";
// get dimensions
const { width, height } = Dimensions.get("window");

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
						onPress={() => logout()}
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
const AVATAR_SIZE = width / 2.5;
const BANNER_SIZE = height / 4.5;
const PADDING = 16;
const styles = StyleSheet.create({
	avatar: {
		width: AVATAR_SIZE - 6 * 2,
		height: AVATAR_SIZE - 6 * 2,
		borderRadius: AVATAR_SIZE - 6 * 2,
	},
	avatarWrapper: {
		alignItems: "center",
		justifyContent: "center",
		left: PADDING,
		width: AVATAR_SIZE,
		height: AVATAR_SIZE,
		borderRadius: AVATAR_SIZE - 6 * 2,
		backgroundColor: theme.colors.surface_bg,
	},
	banner: {
		height: BANNER_SIZE,
		width: width,
		borderRadius: 0,
	},
	container: {
		flex: 1,
	},
	details: {
		marginHorizontal: PADDING,
		marginVertical: 1 * PADDING,
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
		top: -AVATAR_SIZE / 2,
		width: width,
	},
});
