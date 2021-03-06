import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import styled from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";

//***********
// component
//***********

export default function FormButton({ title, ...props }) {
	return <StyledButton {...props}>{title}</StyledButton>;
}

export const FormButton_grad = ({ title, ...props }) => {
	return (
		<StyledButton_grad {...props}>
			<StyledText_grad>{title}</StyledText_grad>
		</StyledButton_grad>
	);
};

//***********
// styles
//***********

import { theme } from "../../styles/theme";
const StyledButton = styled(Button)`
	align-items: center;
	justify-content: center;
	margin-top: 10px;
	width: ${theme.sizes.window_width / 2}px;
	height: ${theme.sizes.window_height / 15}px;
	border-radius: ${theme.sizes.window_height / 15}px;
`;
const StyledButton_grad = styled(LinearGradient)`
	align-items: center;
	justify-content: center;
	margin-top: 10px;
	width: ${theme.sizes.window_width / 2}px;
	height: ${theme.sizes.window_height / 15}px;
	border-radius: 4px;
	background-color: ${(props) =>
		props.bgColor ? props.bgColor : "transparent"};
`;
const StyledText_grad = styled(Text)`
	text-transform: uppercase;
	color: white;
	font-size: 14px;
	font-weight: 500;
	letter-spacing: 1px;
`;
