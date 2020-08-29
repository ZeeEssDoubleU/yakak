import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Title, IconButton, useTheme } from "react-native-paper";
import styled from "styled-components/native";
// import components
import FormInput from "../components/Form/FormInput";
import FormButton from "../components/Form/FormButton";
import AuthInput from "../components/Auth/AuthInput";
import KeyboardAvoidingView from "../components/Keyboard/KeyboardAvoidingView";
import Header from "../components/Header";
import ScreenTransition from "../components/ScreenTransition";
// import context
import { useAuth } from "../context/Auth";

//***********
// component
//***********

export default function SignupScreen({ navigation }) {
	const theme = useTheme();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { register, errors: authErrors } = useAuth();

	useEffect(() => {
		if (authErrors) setErrors(authErrors);
	}, [authErrors]);

	const handleRegister = () => {
		if (confirmPassword !== password)
			setErrors({ code: "auth/passwords-dont-match" });
		else register(email, password);
	};

	return (
		<ScreenTransition>
			<Container>
				<Header>Register to yak!</Header>
				<AuthInput
					labelName="Email"
					value={email}
					autoCapitalize="none"
					onChangeText={(input) => setEmail(input)}
					error={errors.code === "auth/invalid-email" ? errors : false}
				/>

				<AuthInput
					labelName="Password"
					value={password}
					secureTextEntry={true}
					onChangeText={(input) => setPassword(input)}
					error={errors.code === "auth/weak-password" ? errors : false}
				/>

				<AuthInput
					labelName="Comfirm Password"
					value={confirmPassword}
					secureTextEntry={true}
					onChangeText={(input) => setConfirmPassword(input)}
					error={
						errors.code === "auth/passwords-dont-match" ? errors : false
					}
				/>

				<SignupButton
					title="Signup"
					mode="contained"
					onPress={handleRegister}
				/>
				<NavButton
					icon={theme.icons.back_heavy}
					size={theme.sizes.icon_lg}
					color={theme.colors.primary}
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

const Container = styled(KeyboardAvoidingView)``;
const NavButton = styled(IconButton)`
	margin-top: 10px;
	font-size: 18px;
`;
const SignupButton = styled(FormButton)`
	font-size: 22px;
`;
