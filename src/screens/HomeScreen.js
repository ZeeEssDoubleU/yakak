import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import styled from "styled-components/native";
import { firebase_firestore } from "../config/firebase";
// import components
import FormButton from "../components/FormButton";
import Loading from "../components/Loading";
import SwipeToDelete from "../components/FlatList/SwipeToDelete";
import Item from "../components/FlatList/Item";
// import context
import { AuthContext } from "../context/Auth";

//***********
// compoenent
//***********

export default function HomeScreen({ navigation }) {
	const { user, logout } = useContext(AuthContext);
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
	function handleRemove(item) {
		const updateThreads = [...threads];
		updateThreads.splice(updateThreads.indexOf(item), 1);
		setThreads(updateThreads);
	}

	if (loading) return <Loading />;

	return (
		<Container style={{ ...StyleSheet.absoluteFillObject }}>
			<RoomList
				data={threads}
				keyExtractor={(item) => item._id}
				ItemSeparatorComponent={() => <Divider />}
				renderItem={({ item }) => (
					<SwipeToDelete onRemove={() => handleRemove(item)}>
						<Item item={item} {...{ navigation }} />
					</SwipeToDelete>
				)}
			/>
			{/* <Logout
				modeValue="contained"
				title="Logout"
				onPress={() => logout()}
			/> */}
		</Container>
	);
}

//***********
// styles
//***********

const Container = styled(View)`
	background-color: #f5f5f5;
	flex: 1;
`;
const Logout = styled(FormButton)`
	position: absolute;
	align-self: center;
	bottom: 32px;
`;
const RoomList = styled(FlatList)``;
