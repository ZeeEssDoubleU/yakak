import React from "react";
// import providers
import { Provider as MuiProvider } from "react-native-paper";
import { ThemeProvider } from "styled-components/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { AuthProvider } from "./src/context/Auth";
// import components
import Routes from "./src/navigation/Routes";
// import styles
import { theme } from "./src/styles/theme";

export default function App() {
	return (
		<MuiProvider {...{ theme }}>
			<ThemeProvider {...{ theme }}>
				<ActionSheetProvider>
					<AuthProvider>
						<Routes />
					</AuthProvider>
				</ActionSheetProvider>
			</ThemeProvider>
		</MuiProvider>
	);
}
