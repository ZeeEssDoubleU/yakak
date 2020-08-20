import React from "react";
import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
// import components
import DismissKeyboard from "./DismissKeyboard";

//***********
// component
//***********

export default function KeyboardFlexView({ children }) {
	return (
		<DismissKeyboard>
			<Container behavior={Platform.OS == "ios" ? "padding" : "height"}>
				{children}
			</Container>
		</DismissKeyboard>
	);
}
//***********
// styles
//***********

const Container = styled(KeyboardAvoidingView)`
	background-color: #f5f5f5;
	flex: 1;
	justify-content: center;
	align-items: center;
`;
