import React, { useContext, useState } from "react";
import { View, Text, Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import styled from "styled-components/native";
// import components
import FormButton, { FormButton_grad } from "../components/Form/FormButton";
// import context
import { useAuth } from "../context/Auth";
// get dimensions
const { width, height } = Dimensions.get("window");

//***********
// component
//***********

export default function AccountScreen() {
	const { colors } = useTheme();
	const [userDetails, setUserDetails] = useState({
		first_name: "Bob",
		last_name: "Johnson",
	});

	const { user, logout } = useAuth();
	console.log("user:", user); // ? debug

	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<Avatar.Image color={colors.disabled} size={width / 2.5} />
				<View>
					<Text style={styles.details}>
						{userDetails.first_name} {userDetails.last_name}
					</Text>
				</View>
				<Text style={styles.details}>{user.email}</Text>
			</View>
			<FormButton
				style={styles.logout}
				title="Logout"
				mode="contained"
				color={colors.danger_grad4}
				onPress={() => logout()}
			/>
			<FormButton_grad
				style={styles.logout}
				title="Logout"
				colors={[
					colors.danger_grad1,
					colors.danger_grad2,
					colors.danger_grad3,
				]}
				start={{ x: 1, y: 0 }}
				end={{ x: 0, y: 1 }}
				locations={[0, 0.65, 1]}
			/>
			<FormButton_grad
				style={styles.logout}
				title="Logout"
				colors={[colors.primary_grad1, colors.primary_grad2]}
				start={{ x: 1, y: 0 }}
				end={{ x: 0, y: 1 }}
				locations={[0.3, 0.9]}
			/>
		</View>
	);
}

//***********
// styles
//***********

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	details: {
		fontSize: 24,
	},
	logout: {
		bottom: "10%",
	},
	wrapper: {
		top: "10%",
		flex: 1,
	},
});
