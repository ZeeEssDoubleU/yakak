import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import {
	GiftedChat,
	Avatar,
	GiftedAvatar,
	Bubble,
	Send,
} from "react-native-gifted-chat";
import { IconButton, useTheme } from "react-native-paper";
import styled from "styled-components/native";
import { firebase_firestore } from "../config/firebase";
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
			wrapperStyle={{
				right: { backgroundColor: styles.bubble.backgroundColor },
			}}
			textStyle={{
				right: { color: styles.bubble.color },
			}}
		/>
	);
	const loadingComponent = (props) => (
		<FlexContainer>
			<ActivityIndicator size="large" color={theme.colors.primary} />
		</FlexContainer>
	);
	const sendComponent = (props) => (
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
	const scrollComponent = (props) => (
		<FlexContainer>
			<IconButton
				icon={theme.icons.scroll_down}
				size={theme.sizes.icon_lg}
				color={theme.colors.primary}
			/>
		</FlexContainer>
	);
	const systemMessageComponent = (props) => <SystemMessage {...props} />;

	return (
		<GiftedChat
			alwaysShowSend
			// showUserAvatar // ? debug
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
				_id: currentUser.uid,
				name: currentUser.email,
				avatar,
			}}
		/>
	);
}

//***********
// styles
//***********

import { theme } from "../styles/theme";
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
