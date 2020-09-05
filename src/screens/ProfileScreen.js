import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useTheme, TextInput, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useHeaderHeight } from "@react-navigation/stack";
// import components
import FormButton from "../components/Form/FormButton";
import KeyboardAvoidingView from "../components/Keyboard/KeyboardAvoidingView";
import ImagePicker from "../components/ImagePicker";
// import context
import { useAuth } from "../context/auth";
import { useUserDetails } from "../context/userDetails";

//***********
// component
//***********

export default function ProfileScreen() {
	const HEADER_HEIGHT = useHeaderHeight();
	const theme = useTheme();
	const { user, logout } = useAuth();
	const { showActionSheetWithOptions } = useActionSheet();
	const userDetails = useUserDetails();

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
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<Container {...{ HEADER_HEIGHT }}>
					<Banner
						width={theme.sizes.window_width}
						height={theme.sizes.banner}
						borderRadius={0}
						parentImage={userDetails.banner}
						setParentImage={userDetails.setBanner}
						setParentImage_download={userDetails.setBanner_download}
						imageType="banner"
					/>
					<DetailsWrapper>
						<TranslateWrapper>
							<AvatarWrapper>
								<Avatar
									width={theme.sizes.avatar}
									height={theme.sizes.avatar}
									borderRadius={theme.sizes.avatar_border_radius}
									parentImage={userDetails.avatar}
									setParentImage={userDetails.setAvatar}
									setParentImage_download={
										userDetails.setAvatar_download
									}
									imageType="avatar"
								/>
							</AvatarWrapper>
							<Details
								label="Display name (optional)"
								value={userDetails.displayName}
								onChangeText={userDetails.setDisplayName}
							/>
							<Details
								label="Email"
								value={userDetails.email}
								onChangeText={userDetails.setEmail}
								autoCapitalize="none"
							/>
							<Details
								label="About (optional)"
								value={userDetails.about}
								onChangeText={userDetails.setAbout}
								multiline
							/>
						</TranslateWrapper>
						<Logout
							title="Logout"
							mode="contained"
							color={theme.colors.danger}
							onPress={logoutActions}
						/>
					</DetailsWrapper>
				</Container>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

//***********
// styles
//***********

import { theme } from "../styles/theme";

const Avatar = styled(ImagePicker)``;
const AvatarWrapper = styled(View)`
	align-items: center;
	justify-content: center;
	left: ${theme.sizes.window_padding}px;
	/* these attributes are based of avatars attributes */
	width: ${theme.sizes.avatar + 6 * 2}px;
	height: ${theme.sizes.avatar + 6 * 2}px;
	border-radius: ${theme.sizes.avatar_border_radius + 6}px;
	background-color: ${theme.colors.surface_bg}px;
`;
const Banner = styled(ImagePicker)``;
const Container = styled(View)`
	height: ${(props) => theme.sizes.window_height - props.HEADER_HEIGHT}px;
	/* background-color: red; // ? debug */
`;
const DetailsWrapper = styled(View)`
	flex: 1;
`;
const Details = styled(TextInput)`
	border-radius: 4px;
	margin: ${theme.sizes.window_padding}px ${theme.sizes.window_padding}px;
	font-size: 30px;
	background-color: ${theme.colors.surface_bg};
`;
const Logout = styled(FormButton)`
	position: absolute;
	align-self: center;
	bottom: 36px;
`;
const TranslateWrapper = styled(View)`
	flex: 1;
	top: ${-theme.sizes.avatar / 2}px;
	width: ${theme.sizes.window_width}px;
`;
