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

		console.log("download avatar:", downloadURL_avatar);
		console.log("cache avatar:", cacheURL_avatar);

		if (cacheURL_avatar || downloadURL_avatar) {
			setAvatar(cacheURL_avatar);
			setAvatar_download(downloadURL_avatar);
		}
		if (cacheURL_banner || downloadURL_banner) {
			setBanner(cacheURL_banner);
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
