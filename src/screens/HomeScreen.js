import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import styled from "styled-components/native";
import { firebase_firestore } from "../config/firebase";
// import components
import FormButton from "../components/Form/FormButton";
import Loading from "../components/Loading";
import SwipeToDelete from "../components/FlatList/SwipeToDelete";
import Item from "../components/FlatList/Item";
// import context
import { useAuth } from "../context/auth";

//***********
// compoenent
//***********

export default function HomeScreen({ navigation }) {
	const { user, logout } = useAuth();
	const [threads, setThreads] = useState([]);
	const [loading, setLoading] = useState([]);

	// effect fetches room data to display in list
	useEffect(() => {
		// return array of THREAD documents
		const subscribe = firebase_firestore
			.collection("THREADS")
			.orderBy("latestMessage.createdAt", "desc")
			.onSnapshot((snapshot) => {
				// capture and set threads
				const threads = snapshot.docs.map((doc) => {
					return {
						_id: doc.id,
						...doc.data(),
					};
				});

				setThreads(threads);
				if (loading) setLoading(false);
			});

		// unsub on unmount
		return () => subscribe();
	}, []);

	// deletes thread and updates flatlist display
	async function handleRemove(item) {
		// update ui state
		const updateThreads = [...threads];
		updateThreads.splice(updateThreads.indexOf(item), 1);
		setThreads(updateThreads);
		// delete from firestore
		firebase_firestore.collection("THREADS").doc(item._id).delete();
	}

	if (loading) return <Loading />;

	return (
		<Container style={{ ...StyleSheet.absoluteFillObject }}>
			<RoomList
				data={threads}
				keyExtractor={(item) => item._id}
				ItemSeparatorComponent={() => <Divider />}
				renderItem={({ item }) => (
					<SwipeToDelete onRemove={() => handleRemove(item)} {...{ item }}>
						<Item {...{ item }} {...{ navigation }} />
					</SwipeToDelete>
				)}
				ListEmptyComponent={
					<AddRoomButton
						title="AddRoom"
						modeValue="contained"
						onPress={() => navigation.navigate("AddRoom")}
					/>
				}
			/>
		</Container>
	);
}

//***********
// styles
//***********

const AddRoomButton = styled(FormButton)`
	font-size: 22px;
	align-self: center;
`;
const Container = styled(View)`
	background-color: ${(props) => props.theme.colors.surface_bg};
	flex: 1;
`;
const Logout = styled(FormButton)`
	position: absolute;
	align-self: center;
	bottom: 32px;
`;
const RoomList = styled(FlatList)``;
