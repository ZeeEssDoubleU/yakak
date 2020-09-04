import React, {
	createContext,
	useState,
	useEffect,
	useLayoutEffect,
	useContext,
} from "react";
import firebase, {
	firebase_firestore,
	firebase_storage,
} from "../config/firebase";
import { format } from "date-fns/fp";
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
	const [avatar, setAvatar] = useState(null);
	const [banner, setBanner] = useState(null);
	const [errors, setErrors] = useState({});

	// ref used in functions below
	const userDocRef = () =>
		firebase_firestore.collection("USER_DETAILS").doc(user.uid);

	// get user images from firebase store
	const getImages = async () => {
		const avatarURL = await downloadImage(user, "avatar");
		const bannerURL = await downloadImage(user, "banner");
		setAvatar(avatarURL);
		setBanner(bannerURL);
	};
	// get user details
	const getUserDetails = async () => {
		const doc = await userDocRef().get();
		const details = doc.data();

		if (details) {
			setDisplayName(details.displayName);
			setAbout(details.about);
		}
	};
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
		// user details object
		const userDetails = {
			_id: user.uid,
			displayName,
			about,
			// avatar,
			// banner
		};

		// create or update user document
		await userDocRef().set(userDetails);
	};

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
