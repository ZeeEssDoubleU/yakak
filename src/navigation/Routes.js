import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import components
import AuthStack from "../navigation/AuthStack";
import MainStack from "../navigation/ModalStack"; // MainStack nested within ModalStack
// import context
import { useAuth } from "../context/Auth";

export default function Routes() {
	const { user } = useAuth();

	return (
		<NavigationContainer>
			{/* MainStack nested within ModalStack */}
			{user ? <MainStack /> : <AuthStack />}
		</NavigationContainer>
	);
}
