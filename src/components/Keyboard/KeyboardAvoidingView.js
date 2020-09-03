import React from "react";
import { KeyboardAvoidingView } from "react-native";
import styled from "styled-components/native";
// import components
import DismissKeyboard from "./DismissKeyboard";

//***********
// component
//***********

export default function KeyboardAvoid({ children, ...props }) {
	return (
		<DismissKeyboard>
			<Container
				behavior={Platform.OS == "ios" ? "padding" : "height"}
				{...props}
			>
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
	flex: ${(props) => (props.noFlex ? 0 : 1)};
	justify-content: ${(props) => props.justifyContent || "center"};
	align-items: center;
`;
