import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";
import styled from "styled-components/native";
// import components
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton";
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
				onPress={() => navigation.navigate("Signup")}
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
const LoginButton = styled(FormButton)`
	font-size: 22px;
`;
const NavButton = styled(FormButton)`
	font-size: 16px;
`;
