import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { IconButton, Title } from "react-native-paper";
import { firebase_firestore } from "../config/firebase";
import { format } from "date-fns/fp";
// import components
import FormButton from "../components/FormButton";
import FormInput from "../components/FormInput";

//***********
// component
//***********

export default function AddRoomScreen({ navigation }) {
	const [roomName, setRoomName] = useState("");

	async function createRoom() {
		if (roomName.length > 0) {
			const createdAt = Date.now();
			const local = new Date(Date.now());
			const formatTime = format("h:mm a")(local);

			// for permissions info
			// https://firebase.google.com/docs/firestore/security/get-started#auth-required
			await firebase_firestore
				.collection("THREADS")
				.add({
					name: roomName,
					latestMessage: {
						text: `Room created at ${formatTime}`,
						createdAt,
					},
				})
				// docRef used to reference collection right after creation
				.then((docRef) => {
					docRef.collection("MESSAGES").add({
						text: `Room created at ${formatTime}`,
						createdAt,
						system: true,
					});
				});

			navigation.navigate("Home");
		}
	}

	return (
		<Container>
			<CloseButton>
				<IconButton
					icon="close-circle"
					size={36}
					color="#6466ee"
					onPress={() => navigation.goBack()}
				/>
			</CloseButton>
			<DismissKeyboard onPress={() => Keyboard.dismiss()}>
				<Main>
					<StyledTitle>Create a new chat room</StyledTitle>
					<FormInput
						labelName="Room name"
						value={roomName}
						onChangeText={(text) => setRoomName(text)}
						clearButtonMode="while-editing"
					/>
					<FormButton
						title="Create"
						mode="contained"
						onPress={() => createRoom()}
						disabled={roomName.length === 0}
						labelStyle={styles.buttonLabel}
					/>
				</Main>
			</DismissKeyboard>
		</Container>
	);
}

//***********
// component
//***********
const styles = StyleSheet.create({
	buttonLabel: {
		fontSize: 18,
	},
});
const Container = styled(View)`
	flex: 1;
`;
const CloseButton = styled(View)`
	position: absolute;
	top: 30px;
	right: 0;
	z-index: 1;
`;
const DismissKeyboard = styled(TouchableWithoutFeedback)``;
const Main = styled(View)`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
const StyledTitle = styled(Title)`
	font-size: 24px;
	margin-bottom: 10px;
`;