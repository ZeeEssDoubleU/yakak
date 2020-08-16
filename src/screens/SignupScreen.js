import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Title, IconButton } from "react-native-paper";
import styled from "styled-components/native";
// import components
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
// import context
import { AuthContext } from "../context/Auth";

//***********
// component
//***********

export default function SignupScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { register } = useContext(AuthContext);

	return (
		<Container>
			<Header>Register to yak!</Header>
			<FormInput
				labelName="Email"
				value={email}
				autoCapitalize="none"
				onChangeText={(userEmail) => setEmail(userEmail)}
			/>
			<FormInput
				labelName="Password"
				value={password}
				secureTextEntry={true}
				onChangeText={(userPassword) => setPassword(userPassword)}
			/>
			<SignupButton
				title="Signup"
				modeValue="contained"
				onPress={() => register(email, password)}
			/>
			<NavButton
				icon="keyboard-backspace"
				size={30}
				color="#6646ee"
				onPress={() => navigation.navigate("Login")}
			/>
		</Container>
	);
}

//***********
// styles
//***********

const Container = styled(View)`
	background-color: #f5f5f5;
	flex: 1;
	justify-content: center;
	align-items: center;
`;
const Header = styled(Title)`
	font-size: 24px;
	margin-bottom: 10px;
`;
const SignupButton = styled(FormButton)`
	font-size: 22px;
`;
const NavButton = styled(IconButton)`
	margin-top: 10px;
	font-size: 18px;
`;
