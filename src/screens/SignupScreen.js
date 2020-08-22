import React, { useState, useContext } from "react";
import { Title, IconButton, useTheme } from "react-native-paper";
import styled from "styled-components/native";
// import components
import FormInput from "../components/Form/FormInput";
import FormButton from "../components/Form/FormButton";
import KeyboardFlexView from "../components/Keyboard/KeyboardFlexView";
import Header from "../components/Header";
import ScreenTransition from "../components/ScreenTransition";
// import context
import { AuthContext } from "../context/Auth";

//***********
// component
//***********

export default function SignupScreen({ navigation }) {
	const { colors } = useTheme();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { register, errors } = useContext(AuthContext);

	return (
		<ScreenTransition>
			<Container>
				<Header>Register to yak!</Header>
				<FormInput
					labelName="Email"
					value={email}
					autoCapitalize="none"
					onChangeText={(userEmail) => setEmail(userEmail)}
					error={errors.code === "auth/invalid-email" ? errors : false}
				/>
				<FormInput
					labelName="Password"
					value={password}
					secureTextEntry={true}
					onChangeText={(userPassword) => setPassword(userPassword)}
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
const SignupButton = styled(FormButton)`
	font-size: 22px;
`;
const NavButton = styled(IconButton)`
	margin-top: 10px;
	font-size: 18px;
`;
