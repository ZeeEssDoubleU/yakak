import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import components
import AddRoomScreen from "../screens/AddRoomScreen";
// create nav stacks
const Stack = createStackNavigator();
import HomeStack from "./HomeStack";

//***********
// component
//***********

export default function ModalStack() {
	return (
		<Stack.Navigator mode="modal" headerMode="none">
			<Stack.Screen name="Home" component={HomeStack} />
			<Stack.Screen name="AddRoom" component={AddRoomScreen} />
		</Stack.Navigator>
	);
}
