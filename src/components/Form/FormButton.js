import React from "react";
import { Dimensions } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
// get dimensions
const { width, height } = Dimensions.get("window");

//***********
// component
//***********

export default function FormButton({ title, ...props }) {
	return <StyledButton {...props}>{title}</StyledButton>;
}

//***********
// styles
//***********

const StyledButton = styled(Button)`
	display: flex;
	align-content: center;
	justify-content: center;
	margin-top: 10px;
	width: ${width / 2}px;
	height: ${height / 15}px;
`;
