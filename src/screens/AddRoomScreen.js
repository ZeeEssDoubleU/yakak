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
import { useAuth } from "../context/Auth";
import KeyboardAvoidingView from "../components/Keyboard/KeyboardAvoidingView";

//***********
// component
//***********

export default function AddRoomScreen({ navigation }) {
	const theme = useTheme();
	const [roomName, setRoomName] = useState("");
	const { user } = useAuth();

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
		<KeyboardAvoidingView>
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
		</KeyboardAvoidingView>
	);
}

//***********
// component
//***********

const Main = styled(View)`
	justify-content: center;
	align-items: center;
`;
const styles = StyleSheet.create({
	buttonLabel: {
		fontSize: 18,
	},
});
