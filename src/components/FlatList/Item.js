import React from "react";
import { View, StyleSheet } from "react-native";
import { List, Title, IconButton, useTheme, Text } from "react-native-paper";
import { format } from "date-fns/fp";
import styled from "styled-components/native";

//***********
// compoenent
//***********

export default function Item({ item, navigation }) {
	const theme = useTheme();
	// right side of list item (ie time and arrow icon)
	const rightComponent = () => {
		// format time
		const createdAt = item.latestMessage.createdAt;
		const local = new Date(createdAt);
		const formatTime = format("h:mm a")(local);

		return (
			<RightContainer>
				<Time>{formatTime}</Time>
				<StyledIcon
					icon={theme.icons.forward}
					color={theme.colors.text_medium}
				/>
			</RightContainer>
		);
	};

	return (
		<List.Item
			onPress={() => navigation.navigate("Room", { thread: item })}
			title={item.name}
			titleStyle={styles.listTitle}
			description={item.latestMessage.text}
			descriptionNumberOfLines={1}
			descriptionStyle={styles.listDescription}
			right={rightComponent}
		/>
	);
}

//***********
// styles
//***********

const RightContainer = styled(View)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const styles = StyleSheet.create({
	listTitle: { fontSize: 22 },
	listDescription: { fontSize: 16 },
});
const StyledIcon = styled(IconButton)`
	display: flex;
	margin: 0;
`;
const Time = styled(Text)`
	color: ${(props) => props.theme.colors.text_medium};
`;
