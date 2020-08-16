import React from "react";
// import providers
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/context/Auth";
// import components
import Routes from "./src/navigation/Routes";

export default function App() {
	return (
		<PaperProvider>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</PaperProvider>
	);
}
