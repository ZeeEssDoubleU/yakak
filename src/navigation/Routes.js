import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text, SafeAreaView } from "react-native";
// import components
import AuthStack from "../navigation/AuthStack";
import HomeStack from "../navigation/HomeStack";
import { AuthContext } from "../context/Auth";
import Loading from "../components/Loading";

export default function Routes() {
	const { firebase_auth, user, setUser } = useContext(AuthContext);
	const [loading, setLoading] = useState(true);
	const [initializing, setInitializing] = useState(true);

	// handle user state change
	function onAuthStateChange(user) {
		setUser(user);
		if (initializing) setInitializing(false);
		setLoading(false);
	}

	useEffect(() => {
		const subscriber = firebase_auth.onAuthStateChanged(onAuthStateChange);
		return subscriber; // unsubscribe on unmount
	}, []);

	// show loading icon
	if (loading) return <Loading />;

	return (
		<NavigationContainer>
			{user ? <HomeStack /> : <AuthStack />}
		</NavigationContainer>
	);
}
