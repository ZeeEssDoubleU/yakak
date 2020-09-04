import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useTheme } from "react-native-paper";
import { firebase_firestore } from "../config/firebase";
// import components
import {
	bubbleComponent,
	loadingComponent,
	sendComponent,
	scrollComponent,
	systemMessageComponent,
} from "../components/GiftedChat/RenderComponents";
// import context
import { useAuth } from "../context/auth";
import { useUserDetails } from "../context/userDetails";

//***********
// component
//***********

export default function RoomScreen({ route }) {
	const theme = useTheme();
	const { thread } = route.params;
	const { user } = useAuth();
	const { avatar } = useUserDetails();
	const [messages, setMessages] = useState();

	const docRef = async () => {
		const userRef = await firebase_firestore
			.collection("USER_DETAILS")
			.doc(user.uid);
		const doc = await userRef.get();
		const data = doc.data();
		console.log("DOC REFERENCE:", data);
		return data;
	};

	// effect runs when room mounts
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

	return (
		<GiftedChat
			alwaysShowSend
			showUserAvatar // ? debug
			messages={messages}
			onSend={(newMessage) => handleSend(newMessage)}
			// onPressAvatar // TODO: link to users profile page
			renderBubble={bubbleComponent}
			renderLoading={loadingComponent}
			renderSend={sendComponent}
			renderSystemmessage={systemMessageComponent}
			scrollToBottom
			scrollToBottomComponent={scrollComponent}
			user={{
				_id: user.uid,
				name: user.email,
				user: firebase_firestore.collection("USER_DETAILS").doc(user.uid),
			}}
		/>
	);
}
