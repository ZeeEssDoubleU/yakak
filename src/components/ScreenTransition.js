import React, { useContext, useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// import context
import { useAuth } from "../context/Auth";

export default function ScreenTransition({ children }) {
	const { setErrors } = useAuth();

	// use focus effect fires when page transitions away
	useFocusEffect(
		useCallback(() => {
			return () => setErrors({});
		}, []),
	);

	return <>{children}</>;
}
