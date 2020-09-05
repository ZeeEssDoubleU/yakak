export const cloudinaryUpload = async (uploadURL, imageType, user) => {
	// TODO: fix this function
	// ! fetch is not resolving to file in time for cloudinary api call
	// ! setting file at uploadURL directly is not formatted correctly
	const file = await fetch(uploadURL);
	console.log("fetch file:", file); // debug

	const cloudName = "zsw-web-design";
	const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

	const data = new FormData();
	data.append("file", file);
	data.append("public_id", `yakak/${user.uid}/${imageType}`);
	data.append("cloud_name", cloudName);
	data.append("upload_preset", "yakak-upload");

	// fetch
	fetch(url, {
		method: "POST",
		body: data,
	})
		.then((res) => res.json())
		.then((data) => console.log("CLOUDINARY DATA:", data))
		.catch((err) => {
			console.log("Image failed to upload to Cloudinary.");
		});
};
