import React from "react";
import { Dimensions } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("screen");

//***********
// component
//***********

export default function FormButton({ title, modeValue, ...props }) {
	return (
		<StyledButton mode={modeValue} {...props}>
			{title}
		</StyledButton>
	);
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
