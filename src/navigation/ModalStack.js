import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme, IconButton, Button } from "react-native-paper";
import styled from "styled-components";
// import context
import { useAuth } from "../context/Auth";
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
				name="AddRoom"
				component={AddRoomScreen}
				options={({ navigation }) => ({
					headerLeft: () => null,
					headerRight: () => (
						<Close
							icon={theme.icons.close}
							size={theme.sizes.icon_md}
							color={theme.colors.primary}
							onPress={() => navigation.goBack()}
						/>
					),
					// headerTransparent: true,
					cardStyle: {
						top: theme.sizes.statusbar_height,
						height:
							theme.sizes.window_height -
							theme.sizes.statusbar_height * 4,
						borderRadius: 30,
					},
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
							onPress={() => navigation.goBack()}
						>
							Save
						</Save>
					),
					// headerTransparent: true,
					cardOverlayEnabled: true,
					cardStyle: {
						top: theme.sizes.statusbar_height,
						// height: theme.sizes.window_height - theme.sizes.statusbar_height,
						borderRadius: 30,
					},
				})}
			/>
		</Stack.Navigator>
	);
}

//***********
// styles
//***********

const Close = styled(IconButton)``;
const Save = styled(Button)``;
