import firebase, { firebase_storage } from "../config/firebase";

// taken from docs at url below
// https://firebase.google.com/docs/storage/web/download-files
export const downloadImage = async (user, imageType) => {
	try {
		// Create a reference to the file we want to download
		const downloadURL = await firebase_storage
			.ref()
			.child(`${user.uid}/images/${imageType}`)
			.getDownloadURL();

		return downloadURL;
	} catch (error) {
		// A full list of error codes is available at
		// https://firebase.google.com/docs/storage/web/handle-errors
		switch (error.code) {
			case "storage/object-not-found":
				// File doesn't exist
				break;

			case "storage/unauthorized":
				// User doesn't have permission to access the object
				break;

			case "storage/canceled":
				// User canceled the upload
				break;

			case "storage/unknown":
				// Unknown error occurred, inspect the server response
				break;
		}
	}
};
