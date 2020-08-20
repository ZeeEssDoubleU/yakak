import React, { useContext } from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";
import { firebase_firestore } from "../config/firebase";
import styled from "styled-components/native";
// import components
import HomeScreen from "../screens/HomeScreen";
import AddRoomScreen from "../screens/AddRoomScreen";
import RoomScreen from "../screens/RoomScreen";
// import context
import { AuthContext } from "../context/Auth";
// create nav stacks
const Stack = createStackNavigator();

//***********
// component
//***********

export default function HomeStack() {
	const { logout } = useContext(AuthContext);
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
					backgroundColor: "#6646ee",
				},
				headerTintColor: "#ffffff",
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
							color="white"
							onPress={() => navigation.navigate("AddRoom")}
						/>
					),
					headerLeft: () => (
						<Logout
							icon="account-arrow-left-outline"
							size={28}
							color="white"
							onPress={logoutActions}
						/>
					),
				})}
			/>
			<Stack.Screen
				name="Room"
				component={RoomScreen}
				options={({ route }) => ({
					title: route.params.thread.name,
				})}
			/>
		</Stack.Navigator>
	);
}

//***********
// styles
//***********

const AddRoom = styled(IconButton)``;
const Logout = styled(IconButton)``;
