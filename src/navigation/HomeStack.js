import React, { useContext } from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton, useTheme } from "react-native-paper";
import { firebase_firestore } from "../config/firebase";
import styled from "styled-components/native";
// import components
import HomeScreen from "../screens/HomeScreen";
import RoomScreen from "../screens/RoomScreen";
// import context
import { useAuth } from "../context/Auth";
// create nav stacks
const Stack = createStackNavigator();

//***********
// component
//***********

export default function HomeStack() {
	const { colors } = useTheme();
	const { logout } = useAuth();
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
		<Stack.Navigator
			initialRouteName="Home"
			screenOptions={{
				headerStyle: {
					backgroundColor: colors.primary,
				},
				headerTintColor: colors.text_light,
				headerTitleStyle: {
					fontSize: 22,
				},
			}}
		>
			<Stack.Screen
				name="Home"
				component={HomeScreen}
				options={({ navigation }) => ({
					headerRight: () => (
						<AddRoom
							icon="comment-plus-outline"
							size={28}
							color={colors.text_light}
							onPress={() => navigation.navigate("AddRoom")}
						/>
					),
					headerLeft: () => (
						<Logout
							icon="account-outline"
							size={28}
							color={colors.text_light}
							onPress={() => navigation.navigate("Account")}
						/>
					),
				})}
			/>
			<Stack.Screen
				name="Room"
				component={RoomScreen}
				options={({ navigation, route }) => ({
					title: route.params.thread.name,
					headerLeft: () => (
						<GoBack
							icon="arrow-left"
							size={28}
							color={colors.text_light}
							onPress={() => navigation.goBack()}
						/>
					),
				})}
			/>
		</Stack.Navigator>
	);
}

//***********
// styles
//***********

const AddRoom = styled(IconButton)``;
const GoBack = styled(IconButton)``;
const Logout = styled(IconButton)``;
