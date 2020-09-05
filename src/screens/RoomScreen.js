import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { GiftedChat, Avatar } from "react-native-gifted-chat";
import { useTheme, Avatar as MuiAvatar } from "react-native-paper";
import {
	firebase_firestore,
	firebase_auth,
	firebase_storage,
} from "../config/firebase";
// import components
import {
	avatarComponent,
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

	useEffect(() => {
		console.log("user", user.photoURL);
	}, []);

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

	const thing = async () => {
		const avatarRef = await firebase_storage
			.ref()
			.child(`${user.uid}/images/avatar`);

		console.log("TILDJFDFKJDSFLKJ", avatarRef);
		return avatarRef;
	};

	return (
		<GiftedChat
			alwaysShowSend
			showUserAvatar // ? debug
			messages={messages}
			onSend={(newMessage) => handleSend(newMessage)}
			// TODO: displays incorrect image on old messages after user has changed avatar
			// ! firebase cannot reference fields
			// * consider converting just chat section to postgres
			// * keep authenticaion and free stroage on firebase
			// ? consider implementing cloud functions to find and change broken avatar links
			// renderAvatar={}
			renderBubble={bubbleComponent}
			renderLoading={loadingComponent}
			renderSend={sendComponent}
			renderSystemmessage={systemMessageComponent}
			scrollToBottom
			scrollToBottomComponent={scrollComponent}
			user={{
				_id: user.uid,
				name: user.displayName || user.email,
				// avatar: user.photoURL, // ! avatar removed for now, until database setup on postgres
			}}
		/>
	);
}
