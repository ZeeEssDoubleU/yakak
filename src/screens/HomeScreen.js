import React, { useContext, useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { List, Title, Divider, IconButton } from "react-native-paper";
import styled from "styled-components/native";
import { firebase_firestore } from "../config/firebase";
import { format } from "date-fns/fp";
// import components
import FormButton from "../components/FormButton";
import Loading from "../components/Loading";
// import context
import { AuthContext } from "../context/Auth";

//***********
// compoenent
//***********

export default function HomeScreen({ navigation }) {
	const { user, logout } = useContext(AuthContext);
	const [threads, setThreads] = useState([]);
	const [loading, setLoading] = useState([]);

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

	if (loading) return <Loading />;

	const rightComponent = (props) => {};

	// rendered below in flatlist
	const listItem = ({ item }) => {
		const createdAt = item.latestMessage.createdAt;
		const local = new Date(createdAt);
		const formatTime = format("h:mm a")(local);

		const rightComponent = () => (
			<RightContainer>
				<Time>{formatTime}</Time>
				<StyledIcon icon="chevron-right" color={"rgba(0, 0, 0, 0.54)"} />
			</RightContainer>
		);

		return (
			<List.Item
				onPress={() => navigation.navigate("Room", { thread: item })}
				title={item.name}
				titleStyle={styles.listTitle}
				description={item.latestMessage.text}
				descriptionNumberOfLines={1}
				descriptionStyle={styles.listDescription}
				right={rightComponent}
			/>
		);
	};

	return (
		<Container>
			<FlatList
				data={threads}
				keyExtractor={(item) => item._id}
				ItemSeparatorComponent={() => <Divider />}
				renderItem={listItem}
			/>
			<Logout
				modeValue="contained"
				title="Logout"
				onPress={() => logout()}
			/>
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
const RightContainer = styled(View)`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const styles = StyleSheet.create({
	listTitle: {
		fontSize: 22,
	},
	listDescription: {
		fontSize: 16,
	},
});
const StyledIcon = styled(IconButton)`
	display: flex;
	margin: 0;
`;
const Logout = styled(FormButton)`
	position: absolute;
	align-self: center;
	bottom: 32px;
`;
const Time = styled(Text)`
	color: rgba(0, 0, 0, 0.54);
`;
