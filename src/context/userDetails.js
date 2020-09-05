import React, { createContext, useState, useEffect, useContext } from "react";
import firebase, {
	firebase_auth,
	firebase_firestore,
	firebase_storage,
} from "../config/firebase";
import { format } from "date-fns/fp";
// import context
import { useAuth } from "./auth";
// import utils
import { cacheImage } from "../utils/cacheImage";
import { downloadImage } from "../utils/downloadImage";

// create auth context
export const UserDetailContext = createContext();

//***********
// provider
//***********

// TODO: catch upload and download errors
export const UserDetailsProvider = ({ children }) => {
	const { user } = useAuth();
	const [displayName, setDisplayName] = useState("");
	const [about, setAbout] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState(null);
	const [avatar_download, setAvatar_download] = useState(null);
	const [banner, setBanner] = useState(null);
	const [banner_download, setBanner_download] = useState(null);
	const [errors, setErrors] = useState({});

	// ref used in functions below
	const userDocRef = () =>
		firebase_firestore.collection("USER_DETAILS").doc(user.uid);

	// get user images from firebase store
	const getImages = async () => {
		const downloadURL_avatar = await downloadImage(user, "avatar");
		const downloadURL_banner = await downloadImage(user, "banner");
		const cacheURL_avatar = await cacheImage(downloadURL_avatar);
		const cacheURL_banner = await cacheImage(downloadURL_banner);

		// console.log("cacheURL_avatar", cacheURL_avatar); // ? debug
		// console.log("cacheURL_banner", cacheURL_banner); // ? debug

		if (cacheURL_avatar || downloadURL_avatar) {
			setAvatar(cacheURL_avatar || downloadURL_avatar);
			setAvatar_download(downloadURL_avatar);
		}
		if (cacheURL_banner || downloadURL_banner) {
			setBanner(cacheURL_banner || downloadURL_banner);
			setBanner_download(downloadURL_banner);
		}
	};
	// get user details
	const getUserDetails = async () => {
		const doc = await userDocRef().get();
		const details = doc.data();

		if (details) {
			setDisplayName(details.displayName);
			setAbout(details.about);
			setEmail(user.email);
		}
	};

	// get and clear called with effect below
	const getUserData = () => {
		getImages();
		getUserDetails();
	};
	const clearUserData = () => {
		setDisplayName("");
		setAbout("");
		setAvatar(null);
		setBanner(null);
	};
	// effect invokes above functions
	useEffect(() => {
		user ? getUserData() : clearUserData();
	}, [user]);

	// TODO: need to adjust save detail function to create avatar and banner fields on USER_DETAIL table
	// TODO: then have chat message avatars point to USER_DETAILS avatar field
	// TODO: that way chat message avatars will update when user updates avatar
	// saves user details
	const saveUserDetails = async () => {
		console.log("avatar_download saved:", avatar_download); // ? debug
		console.log("banner_download saved:", banner_download); // ? debug

		// user details object
		const userDetails = {
			_id: user.uid,
			displayName,
			email: user.email,
			about,
			avatar: avatar_download,
			banner: banner_download,
		};

		// create or update user document
		try {
			await userDocRef().set(userDetails);
			console.log("User details doc successfully updated :D");
		} catch (err) {
			console.log("User details doc failed to update :(", err);
		}

		// update user auth email
		try {
			await firebase_auth.currentUser.updateEmail(email);
			console.log("User email successfully updated :D");
		} catch (err) {
			console.log("User email failed to update :(", err);
		}

		// update user auth profile
		try {
			await firebase_auth.currentUser.updateProfile({
				displayName: displayName,
				photoURL: avatar_download,
			});
			console.log("User profile successfully updated :D");
		} catch (err) {
			console.log("User profile failed to update :(", err);
		}
	};

	return (
		<UserDetailContext.Provider
			value={{
				displayName,
				setDisplayName,
				about,
				setAbout,
				email,
				setEmail,
				avatar,
				setAvatar,
				setAvatar_download,
				banner,
				setBanner,
				setBanner_download,
				saveUserDetails,
			}}
		>
			{children}
		</UserDetailContext.Provider>
	);
};

//***********
// hook
//***********

export const useUserDetails = () => {
	return useContext(UserDetailContext);
};
