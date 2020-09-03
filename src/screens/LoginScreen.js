import React, { useState, useContext } from "react";
import { Keyboard } from "react-native";
import styled from "styled-components/native";
// import components
import FormInput from "../components/Form/FormInput";
import FormButton from "../components/Form/FormButton";
import AuthInput from "../components/Auth/AuthInput";
import DismissKeyboard from "../components/Keyboard/DismissKeyboard";
import Header from "../components/Header";
import KeyboardAvoidingView from "../components/Keyboard/KeyboardAvoidingView";
import ScreenTransition from "../components/ScreenTransition";
// import context
import { AuthContext } from "../context/auth";

//***********
// component
//***********

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login, errors } = useContext(AuthContext);

	return (
		<ScreenTransition>
			<Container>
				<Header>Welcome to Yakak</Header>
				<AuthInput
					labelName="Email"
					value={email}
					autoCapitalize="none"
					onChangeText={(input) => setEmail(input)}
					error={
						errors.code === "auth/user-not-found" ||
						errors.code === "auth/invalid-email"
							? errors
							: false
					}
				/>
				<AuthInput
					labelName="Password"
					value={password}
					secureTextEntry={true}
					onChangeText={(input) => setPassword(input)}
					error={
						errors.code === "auth/wrong-password" ||
						errors.code === "auth/too-many-requests"
							? errors
							: false
					}
				/>
				<LoginButton
					title="Login"
					mode="contained"
					onPress={() => login(email, password)}
				/>
				<NavButton
					title="New user? Join here"
					mode="text"
					uppercase={false}
					onPress={() => {
						Keyboard.dismiss();
						navigation.navigate("Signup");
					}}
				/>
			</Container>
		</ScreenTransition>
	);
}

//***********
// styles
//***********

const Container = styled(KeyboardAvoidingView)``;
const LoginButton = styled(FormButton)`
	font-size: 22px;
`;
const NavButton = styled(FormButton)`
	font-size: 16px;
`;
