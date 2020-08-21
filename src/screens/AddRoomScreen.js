import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { IconButton, Title, useTheme } from "react-native-paper";
import { firebase_firestore } from "../config/firebase";
import { format } from "date-fns/fp";
// import components
import FormButton from "../components/Form/FormButton";
import FormInput from "../components/Form/FormInput";
import DismissKeyboard from "../components/Keyboard/DismissKeyboard";
import Header from "../components/Header";
// import context
import { AuthContext } from "../context/Auth";
import KeyboardFlexView from "../components/Keyboard/KeyboardFlexView";

//***********
// component
//***********

export default function AddRoomScreen({ navigation }) {
	const { colors } = useTheme();
	const [roomName, setRoomName] = useState("");
	const { user } = useContext(AuthContext);

	async function createRoom() {
		if (roomName.length > 0) {
			// format time
			const createdAt = Date.now();
			const local = new Date(Date.now());
			const formatTime = format("h:mm a")(local);

			const currentUser = { _id: user.uid, email: user.email };

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
					owner: currentUser,
					admin: [currentUser],
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
					icon="close-circle-outline"
					size={32}
					color={colors.primary}
					onPress={() => navigation.goBack()}
				/>
			</CloseButton>
			<Main>
				<Header>Create a new chat room</Header>
				<FormInput
					labelName="Room name"
					value={roomName}
					onChangeText={(text) => setRoomName(text)}
					clearButtonMode="while-editing"
				/>
				<FormButton
					title="Create"
					mode="contained"
					onPress={createRoom}
					disabled={roomName.length === 0}
					labelStyle={styles.buttonLabel}
				/>
			</Main>
		</Container>
	);
}

//***********
// component
//***********
const Container = styled(KeyboardFlexView)``;
const CloseButton = styled(View)`
	position: absolute;
	top: 30px;
	right: 0;
	z-index: 1;
`;
const Main = styled(View)`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
const styles = StyleSheet.create({
	buttonLabel: {
		fontSize: 18,
	},
});
