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
	background-color: ${(props) => props.theme.colors.surface_bg};
	flex: 1;
	justify-content: center;
	align-items: center;
`;
