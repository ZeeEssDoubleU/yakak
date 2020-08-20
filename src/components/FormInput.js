import React from "react";
import { Dimensions } from "react-native";
import { TextInput } from "react-native-paper";
import styled from "styled-components/native";
// get dimensions
const { width, height } = Dimensions.get("window");

//***********
// component
//***********

export default function FormInput({ labelName, ...props }) {
	return <Input label={labelName} numberOfLines={1} {...props} />;
}

//***********
// styles
//***********

const Input = styled(TextInput)`
	margin: 10px 0;
	width: ${width / 1.5}px;
	height: ${height / 15}px;
`;
