import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Title, IconButton, useTheme } from "react-native-paper";
import styled from "styled-components/native";
// import components
import FormInput from "../components/Form/FormInput";
import FormButton from "../components/Form/FormButton";
import KeyboardFlexView from "../components/Keyboard/KeyboardFlexView";
import Header from "../components/Header";
import ScreenTransition from "../components/ScreenTransition";
// import context
import { useAuth } from "../context/Auth";

//***********
// component
//***********

export default function SignupScreen({ navigation }) {
	const { colors } = useTheme();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { register, errors: authErrors } = useAuth();

	useEffect(() => {
		if (authErrors) setErrors(authErrors);
	}, [authErrors]);

	return (
		<ScreenTransition>
			<Container>
				<Header>Register to yak!</Header>
				<FormInput
					labelName="Email"
					value={email}
					autoCapitalize="none"
					onChangeText={(input) => setEmail(input)}
					error={errors.code === "auth/invalid-email" ? errors : false}
				/>

				<PasswordInput
					labelName="Password"
					value={password}
					Icon
					secureTextEntry={true}
					onChangeText={(input) => setPassword(input)}
					error={errors.code === "auth/weak-password" ? errors : false}
				/>

				<FormInput
					labelName="Comfirm Password"
					value={confirmPassword}
					secureTextEntry={true}
					onChangeText={(input) => setConfirmPassword(input)}
					error={errors.code === "auth/weak-password" ? errors : false}
				/>

				<SignupButton
					title="Signup"
					mode="contained"
					onPress={() => register(email, password)}
				/>
				<NavButton
					icon="keyboard-backspace"
					size={30}
					color={colors.primary}
					onPress={() => {
						navigation.navigate("Login");
					}}
				/>
			</Container>
		</ScreenTransition>
	);
}

//***********
// styles
//***********

const Container = styled(KeyboardFlexView)``;
const NavButton = styled(IconButton)`
	margin-top: 10px;
	font-size: 18px;
`;
const PasswordInput = styled(FormInput)``;
const SignupButton = styled(FormButton)`
	font-size: 22px;
`;
