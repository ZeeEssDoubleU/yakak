import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import screens
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator initialRouteName="Login" headerMode="none">
			<Stack.Screen name="Signup" component={SignupScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
		</Stack.Navigator>
	);
}