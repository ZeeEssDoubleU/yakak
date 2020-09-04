import firebase, { firebase_storage } from "../config/firebase";

// function uploads image to firebase_storage
// taken from docs at url below
// https://firebase.google.com/docs/storage/web/upload-files
export const uploadImage = async (user, url, imageType, setState) => {
	// capture url string
	const file = await fetch(url);
	// convert to blob
	const blob = await file.blob();

	// upload file to object userid/images/imagetype (or userid/images/filename)
	const uploadTask = firebase_storage
		.ref()
		.child(`${user.uid}/images/${imageType ? imageType : blob.name}`)
		.put(blob);

	// listen for state changes, errors, and completion of the upload.
	uploadTask.on(
		firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
		(snapshot) => {
			// get upload progress
			const progress =
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log("Upload is " + progress.toFixed(0) + "% done");

			switch (snapshot.state) {
				case firebase.storage.TaskState.PAUSED: // or 'paused'
					console.log("Upload is paused");
					break;
				case firebase.storage.TaskState.RUNNING: // or 'running'
					console.log("Upload is running");
					break;
			}
		},
		(error) => {
			// A full list of error codes is available at
			// https://firebase.google.com/docs/storage/web/handle-errors
			switch (error.code) {
				case "storage/unauthorized":
					// User doesn't have permission to access the object
					break;
				case "storage/canceled":
					// User canceled the upload
					break;
				case "storage/unknown":
					// Unknown error occurred, inspect error.serverResponse
					break;
			}
		},
		async () => {
			// Upload completed successfully, now we can get the download URL
			const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
			console.log("File available at:", downloadURL);

			// if setState arg present, call setState
			if (setState) {
				setState(downloadURL);
			}

			return downloadURL;
		},
	);
};
