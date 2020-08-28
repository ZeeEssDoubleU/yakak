import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import components
import AuthStack from "../navigation/AuthStack";
import HomeStack from "../navigation/ModalStack"; // HomeStack nested within ModalStack
// import context
import { useAuth } from "../context/Auth";

export default function Routes() {
	const { user } = useAuth();

	return (
		<NavigationContainer>
			{/* HomeStack nested within ModalStack */}
			{user ? <HomeStack /> : <AuthStack />}
		</NavigationContainer>
	);
}
