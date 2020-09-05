import React from "react";
import { View, ActivityIndicator } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import styled from "styled-components/native";

export default function Loading() {
	const theme = useTheme();

	return (
		<Container>
			<ActivityIndicator size="large" color={theme.colors.primary} />
		</Container>
	);
}

const Container = styled(View)`
	flex: 1;
	align-items: center;
	justify-content: center;
`;
