import React, { useState, useContext } from "react";
import styled from "styled-components/native";
// import components
import FormInput from "../components/Form/FormInput";
import FormButton from "../components/Form/FormButton";
import DismissKeyboard from "../components/Keyboard/DismissKeyboard";
import Header from "../components/Header";
import KeyboardFlexView from "../components/Keyboard/KeyboardFlexView";
// import context
import { AuthContext } from "../context/Auth";

//***********
// component
//***********

export default function LoginScreen({ navigation }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useContext(AuthContext);

	return (
		<Container>
			<>
				<Header>Welcome to Yakak</Header>
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
				<LoginButton
					title="Login"
					modeValue="contained"
					onPress={() => login(email, password)}
				/>
				<NavButton
					title="New user? Join here"
					modeValue="text"
					uppercase={false}
					onPress={() => {
						Keyboard.dismiss();
						navigation.navigate("Signup");
					}}
				/>
			</>
		</Container>
	);
}

//***********
// styles
//***********

const Container = styled(KeyboardFlexView)``;
const LoginButton = styled(FormButton)`
	font-size: 22px;
`;
const NavButton = styled(FormButton)`
	font-size: 16px;
`;
