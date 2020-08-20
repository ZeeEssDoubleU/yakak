import React from "react";
import { View, Text } from "react-native";
import { Title } from "react-native-paper";
import styled from "styled-components/native";

//***********
// component
//***********

export default function Header({ children }) {
	return (
		<Container>
			<StyledTitle>{children}</StyledTitle>
		</Container>
	);
}

//***********
// styles
//***********

const Container = styled(View)`
	margin-bottom: 10px;
`;
const StyledTitle = styled(Title)`
	font-size: 24px;
`;
