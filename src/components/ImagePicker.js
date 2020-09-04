import React, { useEffect, useState } from "react";
import { Button, Image, View, TouchableWithoutFeedback } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import styled from "styled-components/native";
import { Avatar as MuiAvatar } from "react-native-paper";
import isEmpty from "lodash/fp/isEmpty";
// import context
import { useAuth } from "../context/auth";
import { useUserDetails } from "../context/userDetails";
import { useUploadImage } from "../utils/useUploadImage";

//***********
// component
//***********

export default function ImagePicker({ children, ...props }) {
	const { uploadImage } = useUserDetails();
	const { user } = useAuth();
	const [image, setImage] = useState();
	const [uploadURL, setUploadURL] = useState(null);
	const { downloadURL } = useUploadImage(user, uploadURL, props.imageType);

	// effect sets imagePicker's parent image when a valid download url is present
	useEffect(() => {
		if (downloadURL) props.setParentImage(downloadURL);
	}, [downloadURL]);

	// effect gets phone permissions on page load
	useEffect(() => {
		getPhonePermissions();
	}, []);

	// function gets phont permissions.  Invoked in above effect
	const getPhonePermissions = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== "granted") {
				alert("Please allow permssion to access your photos/camera.");
			}
		}
	};

	// function opens image library / camera on phone.  Invoked by onPress event
	const pickImage = async () => {
		try {
			let result = await ExpoImagePicker.launchImageLibraryAsync({
				mediaTypes: ExpoImagePicker.MediaTypeOptions.images,
				allowsEditing: true,
				aspect: [props.width, props.height],
				quality: 1,
			});

			if (!result.cancelled) {
				// if parentImage exists, set uploadURL state (at top)
				// if not, set this ImagePicker image
				props.setParentImage
					? setUploadURL(result.uri)
					: setImage(result.uri);
			}

			console.log("result:", result); // ? debug
		} catch (err) {
			console.log("error:", err);
		}
	};

	// function chooses image source based on provided props
	const imageSource = () => {
		if (!isEmpty(props.parentImage)) {
			return { uri: props.parentImage };
		} else if (!isEmpty(image)) {
			return { uri: image };
		} else {
			return null;
		}
	};

	return (
		<TouchableWithoutFeedback onPress={pickImage}>
			<StyledImage source={imageSource()} {...props} />
		</TouchableWithoutFeedback>
	);
}

//***********
// styles
//***********

const StyledImage = styled.Image`
	height: ${(props) => props.height}px;
	width: ${(props) => props.width}px;
	border-radius: ${(props) => props.borderRadius}px;
	background-color: ${(props) => props.theme.colors.disabled};
`;
