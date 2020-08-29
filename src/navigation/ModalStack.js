import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../context/Auth";
import { useTheme, IconButton, Button } from "react-native-paper";
import styled from "styled-components";
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
					fontSize: theme.fonts.nav_header_size,
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
							size={theme.fonts.icon_md}
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
							size={theme.fonts.icon_md}
							color={theme.colors.primary}
							onPress={() => navigation.goBack()}
						/>
					),
					headerRight: () => (
						<Save
							size={theme.fonts.icon_md}
							color={theme.colors.primary}
							onPress={() => navigation.goBack()}
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

const Close = styled(IconButton)``;
const Save = styled(Button)``;
