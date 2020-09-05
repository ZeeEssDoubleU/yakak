import React from "react";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme, IconButton, Button, Text } from "react-native-paper";
import styled from "styled-components";
// import context
import { useAuth } from "../context/auth";
import { useUserDetails } from "../context/userDetails";
// import components
import AddRoomScreen from "../screens/AddRoomScreen";
import ProfileScreen from "../screens/ProfileScreen";
// create nav stacks
const Stack = createStackNavigator();
import MainStack from "./MainStack";

//***********
// component
//***********

export default function ModalStack() {
	const { logout } = useAuth();
	const { saveUserDetails } = useUserDetails();
	const theme = useTheme();

	return (
		<Stack.Navigator
			mode="modal"
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.colors.surface_bg,
				},
				headerTintColor: theme.colors.primary,
				headerTitleStyle: {
					fontSize: theme.sizes.nav_header,
				},
			}}
		>
			<Stack.Screen
				name="Rooms"
				component={MainStack}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Add Room"
				component={AddRoomScreen}
				options={({ navigation }) => ({
					// headerShown: false,
					headerLeft: () => null,
					headerRight: () => (
						<Close
							icon={theme.icons.close}
							size={theme.sizes.icon_md}
							color={theme.colors.primary}
							onPress={() => navigation.goBack()}
						/>
					),
				})}
			/>
			<Stack.Screen
				name="Profile"
				component={ProfileScreen}
				options={({ navigation }) => ({
					headerLeft: () => (
						<Close
							icon={theme.icons.close}
							size={theme.sizes.icon_md}
							color={theme.colors.primary}
							onPress={() => navigation.goBack()}
						/>
					),
					headerRight: () => (
						<Save
							size={theme.sizes.icon_md}
							color={theme.colors.primary}
							onPress={() => {
								saveUserDetails();
								navigation.goBack();
							}}
						>
							Save
						</Save>
					),
				})}
			/>
		</Stack.Navigator>
	);
}

//***********
// styles
//***********

import { theme } from "../styles/theme";

const Card = styled(View)`
	top: ${theme.sizes.statusbar_height}px;
	border-radius: 30;
`;
const Close = styled(IconButton)``;
const Save = styled(Button)``;
const styles = StyleSheet.create({
	card: {
		top: theme.sizes.statusbar_height,
		borderRadius: 30,
	},
});
