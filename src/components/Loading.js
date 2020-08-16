import React from "react";
import { View, ActivityIndicator } from "react-native";
import styled from "styled-components/native";

export default function Loading() {
	return (
		<Container>
			<ActivityIndicator size="large" color="#6646ee" />
		</Container>
	);
}

const Container = styled(View)`
	flex: 1;
	align-items: center;
	justify-content: center;
`;
