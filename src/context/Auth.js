import React, { createContext, useState } from "react";
import { firebase_auth } from "../config/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	return (
		<AuthContext.Provider
			value={{
				firebase_auth,
				user,
				setUser,
				login: async (email, password) => {
					try {
						await firebase_auth.signInWithEmailAndPassword(
							email,
							password,
						);
					} catch (err) {
						console.error(err);
					}
				},
				register: async (email, password) => {
					try {
						await firebase_auth.createUserWithEmailAndPassword(
							email,
							password,
						);
					} catch (err) {
						console.error(err);
					}
				},
				logout: async () => {
					try {
						await firebase_auth.signOut();
					} catch (err) {
						console.error(err);
					}
				},
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
