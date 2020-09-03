import React, { createContext, useState, useEffect, useContext } from "react";
import firebase, {
	firebase_firestore,
	firebase_storage,
} from "../config/firebase";
import { format } from "date-fns/fp";
// import components
import Loading from "../components/Loading";
// import context
import { useAuth } from "./auth";
// import utils
import { uploadImage } from "../utils/uploadImage";
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
	const [avatar, setAvatar] = useState();
	const [banner, setBanner] = useState();
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);

	// ref used in functions below
	const userDocRef = firebase_firestore
		.collection("USER_DETAILS")
		.doc(user.uid);

	// get user images from firebase store
	const getImages = async () => {
		const avatarURL = await downloadImage(user, "avatar");
		const bannerURL = await downloadImage(user, "banner");
		setAvatar(avatarURL);
		setBanner(bannerURL);
		setLoading(false);
	};
	// get user details
	const getUserDetails = async () => {
		const doc = await userDocRef.get();
		const details = doc.data();

		setDisplayName(details.displayName);
		setAbout(details.about);
	};
	// effect invokes above function
	useEffect(() => {
		getImages();
		getUserDetails();
	}, []);

	// user details object
	const userDetails = {
		_id: user.uid,
		displayName,
		about,
	};
	// saves user details
	const saveUserDetails = async () => {
		// create or update user document
		await userDocRef.set(userDetails);
	};
	// effect used for debugging
	useEffect(() => {
		// console.log("userDetails:", userDetails); // ? debug
	}, [userDetails]);

	// show loading icon
	if (loading) return <Loading />;

	return (
		<UserDetailContext.Provider
			value={{
				displayName,
				setDisplayName,
				about,
				setAbout,
				avatar,
				setAvatar,
				banner,
				setBanner,
				saveUserDetails,
				uploadImage,
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
