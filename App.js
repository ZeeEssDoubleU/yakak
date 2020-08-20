import React from "react";
// import providers
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/context/Auth";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
// import components
import Routes from "./src/navigation/Routes";

export default function App() {
	return (
		<PaperProvider>
			<ActionSheetProvider>
				<AuthProvider>
					<Routes />
				</AuthProvider>
			</ActionSheetProvider>
		</PaperProvider>
	);
}
