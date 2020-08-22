import React, { useContext, useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// import context
import { AuthContext } from "../context/Auth";

export default function ScreenTransition({ children }) {
	const { setErrors } = useContext(AuthContext);

	// use focus effect fires when page transitions away
	useFocusEffect(
		useCallback(() => {
			return () => setErrors({});
		}, []),
	);

	return <>{children}</>;
}
