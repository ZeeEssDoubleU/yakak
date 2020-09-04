import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import styled from "styled-components";
import { Bubble, Send } from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";

//***********
// component
//***********

export const bubbleComponent = (props) => (
	<Bubble
		{...props}
		wrapperStyle={{
			right: { backgroundColor: styles.bubble.backgroundColor },
		}}
		textStyle={{
			right: { color: styles.bubble.color },
		}}
	/>
);

//***********
// component
//***********

export const loadingComponent = (props) => (
	<FlexContainer>
		<ActivityIndicator size="large" color={theme.colors.primary} />
	</FlexContainer>
);

//***********
// component
//***********

export const sendComponent = (props) => (
	<Send {...props}>
		<SendContainer>
			<IconButton
				icon={theme.icons.send}
				size={theme.sizes.icon_lg}
				color={theme.colors.primary}
			/>
		</SendContainer>
	</Send>
);

//***********
// component
//***********

export const scrollComponent = (props) => (
	<FlexContainer>
		<IconButton
			icon={theme.icons.scroll_down}
			size={theme.sizes.icon_lg}
			color={theme.colors.primary}
		/>
	</FlexContainer>
);

//***********
// component
//***********

export const systemMessageComponent = (props) => <SystemMessage {...props} />;

//***********
// styles
//***********

import { theme } from "../../styles/theme";
const Container = styled(View)`
	justify-content: center;
	align-items: center;
`;
const FlexContainer = styled(Container)`
	flex: 1;
`;
const SendContainer = styled(Container)`
	height: 100%;
`;
const styles = StyleSheet.create({
	avatar: {
		backgroundColor: theme.colors.primary,
		color: theme.colors.text_light,
	},
	bubble: {
		backgroundColor: theme.colors.primary,
		color: theme.colors.text_light,
	},
});
