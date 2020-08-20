import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { IconButton } from "react-native-paper";
import styled from "styled-components/native";
import Animated, {
	divide,
	interpolate,
	Extrapolate,
	sub,
	cond,
	add,
	lessThan,
	multiply,
} from "react-native-reanimated";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useActionSheet } from "@expo/react-native-action-sheet";
// import context
import { AuthContext } from "../../context/Auth";

//***********
// component
//***********

export default function SwipeActions({
	height,
	x,
	deleteOpacity,
	item,
	shouldRemove,
}) {
	const { user } = useContext(AuthContext);
	//
	const size = x;
	const iconOpacity = interpolate(size, {
		inputRange: [height - 10, height + 10],
		outputRange: [1, 0],
	});
	const textOpacity = sub(1, iconOpacity);

	// check if current user is owner of chat room
	const isOwner = () => item.owner._id === user.uid;

	// shows action sheet upon clicking remove button
	const { showActionSheetWithOptions } = useActionSheet();
	const removeActions = () => {
		// returns different action sheets based if owner
		isOwner() === true
			? showActionSheetWithOptions(
					// actions sheet options
					{
						message:
							"Are you sure you want to delete this chat room?  It will completely remove the room for every user.",
						options: ["Delete", "Cancel"],
						cancelButtonIndex: 1,
						destructiveButtonIndex: 0,
					},
					(buttonIndex) => {
						// delete button
						if (buttonIndex === 0) return shouldRemove.setValue(1);
						// cancel button
						else if (buttonIndex === 1) return null;
					},
			  )
			: showActionSheetWithOptions(
					// actions sheet options
					{
						message: "You can't delete this room.  You aren't the owner.",
						options: ["Cancel"],
						cancelButtonIndex: 1,
					},
					(buttonIndex) => null,
			  );
	};

	return (
		<TouchableWithoutFeedback onPress={removeActions}>
			<RemoveContainer style={{ width: size }} {...{ isOwner }}>
				<IconContainer
					style={{
						...StyleSheet.absoluteFillObject,
						opacity: iconOpacity,
					}}
				>
					<RemoveIcon icon="minus" size={28} color="white" />
				</IconContainer>
				<TextContainer
					style={{
						...StyleSheet.absoluteFillObject,
						// deleteOpacity changes only after remove confirmed
						opacity: multiply(textOpacity, deleteOpacity),
					}}
				>
					<RemoveText>Remove</RemoveText>
				</TextContainer>
			</RemoveContainer>
		</TouchableWithoutFeedback>
	);
}

//***********
// styles
//***********

const Container = styled(Animated.View)`
	justify-content: center;
	align-items: center;
`;
const ActionsContainer = styled(Container)``;
const IconContainer = styled(Container)``;
const RemoveContainer = styled(Container)`
	height: 100%;
	background-color: #d93f12;
	background-color: ${(props) =>
		props.isOwner() === false ? "#d93f12" : "lightgrey"};
`;
const RemoveIcon = styled(IconButton)``;
const RemoveText = styled(Text)`
	color: white;
	font-size: 14px;
`;
const TextContainer = styled(Container)``;
