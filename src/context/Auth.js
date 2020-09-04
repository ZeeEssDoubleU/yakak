import React, { createContext, useState, useEffect, useContext } from "react";
import { firebase_auth } from "../config/firebase";
// import components
import Loading from "../components/Loading";

// create auth context
export const AuthContext = createContext();

//***********
// provider
//***********

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);

	// effect subscribes to firebase authentication changes
	useEffect(() => {
		const subscriber = firebase_auth.onAuthStateChanged(onAuthStateChange);
		return subscriber; // unsubscribe on unmount
	}, []);

	// handle user state change
	const onAuthStateChange = (user) => {
		user ? setUser(user) : setUser(null);
		setLoading(false);
	};

	const login = async (email, password) => {
		try {
			await firebase_auth.signInWithEmailAndPassword(email, password);
		} catch (err) {
			catchError(err);
		}
	};

	const register = async (email, password) => {
		try {
			await firebase_auth.createUserWithEmailAndPassword(email, password);
		} catch (err) {
			catchError(err);
		}
	};

	const logout = async () => {
		try {
			await firebase_auth.signOut();
		} catch (err) {
			catchError(err);
		}
	};

	// format errors
	const catchError = (err) => {
		const error = {
			code: err.code,
			message: err.message,
		};
		setErrors(error);
		// console.log(error); // ? debug
	};

	// show loading icon
	if (loading) return <Loading />;

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				login,
				register,
				logout,
				errors,
				setErrors,
				onAuthStateChange,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

//***********
// hook
//***********

export const useAuth = () => {
	return useContext(AuthContext);
};
