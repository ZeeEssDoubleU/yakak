import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { GiftedChat, Bubble, Send } from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";
import styled from "styled-components/native";
import { firebase_firestore } from "../config/firebase";
// import context
import { AuthContext } from "../context/Auth";

//***********
// component
//***********

export default function RoomScreen({ route }) {
	const { thread } = route.params;
	const { user } = useContext(AuthContext);
	const currentUser = user.toJSON();
	const [messages, setMessages] = useState();

	useEffect(() => {
		// subscribe to chat room messages on firestore
		const subscribe = firebase_firestore
			.collection("THREADS")
			.doc(thread._id)
			.collection("MESSAGES")
			.orderBy("createdAt", "desc")
			.onSnapshot((querySnapshot) => {
				const messages = querySnapshot.docs.map((doc) => {
					return {
						_id: doc.id,
						...doc.data(),
					};
				});

				setMessages(messages);
			});

		return () => subscribe(); // unsub on unmount
	}, []);

	async function handleSend(newMessage) {
		const { text, user } = newMessage[0];
		const createdAt = Date.now(); // don't use createdAt from newMessage. Incorrect format

		// add message to MESSAGES collection in firestore
		firebase_firestore
			.collection("THREADS")
			.doc(thread._id)
			.collection("MESSAGES")
			.add({
				text,
				createdAt,
				user,
			});

		// add message to latestMessage to THREAD collection in firestore
		firebase_firestore.collection("THREADS").doc(thread._id).set(
			{
				latestMessage: {
					text,
					createdAt,
				},
			},
			{ merge: true },
		);
	}

	// GiftedChat components
	const bubbleComponent = (props) => (
		<Bubble
			{...props}
			wrapperStyle={{ right: styles.background }}
			textStyle={{ right: styles.bubbleText }}
		/>
	);
	const sendComponent = (props) => (
		<Send {...props}>
			<SendContainer>
				<IconButton icon="send" size={32} color="#6646ee" />
			</SendContainer>
		</Send>
	);
	const scrollComponent = (props) => (
		<FlexContainer>
			<IconButton icon="chevron-double-down" size={36} color="#6646ee" />
		</FlexContainer>
	);
	const loadingComponent = (props) => (
		<FlexContainer>
			<ActivityIndicator size="large" color="#6646ee" />
		</FlexContainer>
	);
	const systemMessageComponent = (props) => (
		<SystemMessage
			{...props}
			wrapperStyle={styles.background}
			textStyle={styles.systemMessageText}
		/>
	);

	return (
		<GiftedChat
			messages={messages}
			onSend={(newMessage) => handleSend(newMessage)}
			user={{ _id: currentUser.uid, name: currentUser.email }}
			renderLoading={loadingComponent}
			renderBubble={bubbleComponent}
			renderSend={sendComponent}
			renderSystemmessage={systemMessageComponent}
			alwaysShowSend
			scrollToBottom
			scrollToBottomComponent={scrollComponent}
		/>
	);
}

//***********
// styles
//***********

const styles = StyleSheet.create({
	background: {
		backgroundColor: "#6646ee",
	},
	bubbleText: {
		color: "white",
	},
	systemMessageText: {
		fontSize: 14,
		color: "white",
		fontWeight: "bold",
	},
});
const Container = styled(View)`
	justify-content: center;
	align-items: center;
`;
const SendContainer = styled(Container)`
	height: 100%;
`;
const FlexContainer = styled(Container)`
	flex: 1;
`;
