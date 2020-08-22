import React, { createContext, useState } from "react";
import { firebase_auth } from "../config/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [errors, setErrors] = useState({});

	const catchError = (err) => {
		const error = {
			code: err.code,
			message: err.message,
		};
		setErrors(error);
		// console.log(error); // ? debug
	};

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
						catchError(err);
					}
				},
				register: async (email, password) => {
					try {
						await firebase_auth.createUserWithEmailAndPassword(
							email,
							password,
						);
					} catch (err) {
						catchError(err);
					}
				},
				logout: async () => {
					try {
						await firebase_auth.signOut();
					} catch (err) {
						catchError(err);
					}
				},
				errors,
				setErrors,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
