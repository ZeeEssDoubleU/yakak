import React, { useState, useContext } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useHeaderHeight } from "@react-navigation/stack";
import styled from "styled-components/native";
import { Title, useTheme } from "react-native-paper";
import { firebase_firestore } from "../config/firebase";
import { format } from "date-fns/fp";
// import components
import FormButton from "../components/Form/FormButton";
import FormInput from "../components/Form/FormInput";
import Header from "../components/Header";
import KeyboardAvoidingView from "../components/Keyboard/KeyboardAvoidingView";
// import context
import { useAuth } from "../context/auth";

//***********
// component
//***********

export default function AddRoomScreen({ navigation }) {
	const HEADER_HEIGHT = useHeaderHeight();
	const theme = useTheme();
	const [roomName, setRoomName] = useState("");
	const { user } = useAuth();

	async function createRoom() {
		if (roomName.length > 0) {
			// format time
			const createdAt = Date.now();
			const local = new Date(createdAt);
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

			navigation.navigate("Rooms");
		}
	}

	return (
		<KeyboardAvoidingView>
			<Container {...{ HEADER_HEIGHT }}>
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
					// style={{ position: "absolute", bottom: 36 }} // ? debug
				/>
			</Container>
		</KeyboardAvoidingView>
	);
}

//***********
// component
//***********

import { theme } from "../styles/theme";

const Container = styled(View)`
	justify-content: center;
	align-items: center;
	height: ${(props) => theme.sizes.window_height - props.HEADER_HEIGHT}px;
	width: ${theme.sizes.window_width}px;
	/* background-color: red; // ? debug */
`;
