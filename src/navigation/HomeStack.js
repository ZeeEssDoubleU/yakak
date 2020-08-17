import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { IconButton } from "react-native-paper";
// import components
import HomeScreen from "../screens/HomeScreen";
import AddRoomScreen from "../screens/AddRoomScreen";
import RoomScreen from "../screens/RoomScreen";

const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();

//***********
// component
//***********

function ChatApp() {
	return (
		<ChatAppStack.Navigator
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
			<ChatAppStack.Screen
				name="Home"
				component={HomeScreen}
				options={({ navigation }) => ({
					headerRight: () => (
						<IconButton
							icon="message-plus"
							size={28}
							color="white"
							onPress={() => navigation.navigate("AddRoom")}
						/>
					),
				})}
			/>
			<ChatAppStack.Screen
				name="Room"
				component={RoomScreen}
				options={({ route }) => ({
					title: route.params.thread.name,
				})}
			/>
		</ChatAppStack.Navigator>
	);
}

export default function HomeStack() {
	return (
		<ModalStack.Navigator mode="modal" headerMode="none">
			<ModalStack.Screen name="ChatApp" component={ChatApp} />
			<ModalStack.Screen name="AddRoom" component={AddRoomScreen} />
		</ModalStack.Navigator>
	);
}
