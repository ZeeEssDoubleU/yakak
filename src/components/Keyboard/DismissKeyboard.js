import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

//***********
// component
//***********

export default function DismissKeyboard({ children }) {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			{children}
		</TouchableWithoutFeedback>
	);
}
