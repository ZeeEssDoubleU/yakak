import React from "react";
import { View, Text } from "react-native";
// import components
import FormInput from "../Form/FormInput";

export default function AuthInput({ error = false, ...props }) {
	const displayError = (error) => {
		switch (error.code) {
			case "auth/invalid-email":
				return "Email is empty or incorrectly formatted.";
			case "auth/user-not-found":
				return "User not found.  Please try again";
			case "auth/wrong-password":
				return "Incorrect password.  Please try again.";
			case "auth/too-many-requests":
				return "Too many unsuccessful login attempts. Please try again later.";
			case "auth/weak-password":
				return "Password should be at least 6 characters.";
			case "auth/passwords-dont-match":
				return "Passwords don't match.  Please try again.";
			default:
				return;
		}
	};

	return <FormInput {...props} error={displayError(error)} />;
}
