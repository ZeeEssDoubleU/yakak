import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Avatar, IconButton, useTheme } from "react-native-paper";
import { firebase_firestore } from "../config/firebase";
import styled from "styled-components/native";
// import components
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RoomScreen from "../screens/RoomScreen";
// import context
import { useAuth } from "../context/auth";
import { useUserDetails } from "../context/userDetails";
// create nav stacks
const Stack = createStackNavigator();

//***********
// component
//***********

export default function MainStack() {
	const theme = useTheme();
	const { logout, user } = useAuth();
	const { avatar } = useUserDetails();

	return (
		<Stack.Navigator
			initialRouteName="Rooms"
			screenOptions={{
				// headerShown: false,
				headerStyle: {
					backgroundColor: theme.colors.primary,
				},
				headerTintColor: theme.colors.text_light,
				headerTitleStyle: {
					fontSize: theme.sizes.nav_header,
				},
			}}
		>
			<Stack.Screen
				name="Rooms"
				component={HomeScreen}
				options={({ navigation }) => ({
					headerRight: () => (
						<AddRoom
							icon={theme.icons.add}
							size={theme.sizes.icon_md}
							color={theme.colors.text_light}
							onPress={() => navigation.navigate("Add Room")}
						/>
					),
					headerLeft: () => (
						<Logout
							icon={
								user && avatar
									? () => (
											<Avatar.Image
												source={{ uri: avatar }}
												size={theme.sizes.icon_sm}
											/>
									  )
									: theme.icons.profile
							}
							size={theme.sizes.icon_md}
							color={user && avatar ? null : theme.colors.text_light}
							onPress={() => navigation.navigate("Profile")}
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
							icon={theme.icons.back}
							size={theme.sizes.icon_md}
							color={theme.colors.text_light}
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

const AddRoom = styled(IconButton)`
	font-weight: 800;
`;
const GoBack = styled(IconButton)``;
const Logout = styled(IconButton)``;
