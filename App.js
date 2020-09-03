import React from "react";
// import providers
import { ThemeProvider } from "./src/styles/theme";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { AuthProvider } from "./src/context/auth";
import { UserDetailsProvider } from "./src/context/userDetails";
// import components
import Routes from "./src/navigation/Routes";
// import styles
import { theme } from "./src/styles/theme";

export default function App() {
	return (
		<ThemeProvider>
			<ActionSheetProvider>
				<AuthProvider>
					<UserDetailsProvider>
						<Routes />
					</UserDetailsProvider>
				</AuthProvider>
			</ActionSheetProvider>
		</ThemeProvider>
	);
}
