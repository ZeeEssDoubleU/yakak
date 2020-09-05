import React, { useEffect, useState } from "react";
import { Button, Image, View, TouchableWithoutFeedback } from "react-native";
import * as ExpoImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import styled from "styled-components/native";
import { IconButton, useTheme } from "react-native-paper";
import isEmpty from "lodash/fp/isEmpty";
// import context
import { useAuth } from "../context/auth";
import { useUploadImage_firebase } from "../utils/useUploadImage_firebase";
import { cacheImage } from "../utils/cacheImage";

//***********
// component
//***********

export default function ImagePicker({ children, ...props }) {
	const theme = useTheme();
	const { user } = useAuth();
	const [image, setImage] = useState();
	const [uploadURL, setUploadURL] = useState(null);
	// downloadURL only returned if valid uploadURL present
	const { downloadURL } = useUploadImage_firebase(
		user,
		uploadURL,
		props.imageType,
	);

	// functions caches (if possible) and sets imagePicker's parent image
	const cacheAndSetImage = async () => {
		try {
			if (downloadURL) {
				const cacheURL = await cacheImage(downloadURL);
				props.setParentImage(cacheURL || downloadURL);
				props.setParentImage_download(downloadURL);
			}
		} catch (err) {
			console.log(err);
		}
	};
	// effect calls function above
	useEffect(() => {
		cacheAndSetImage();
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
			console.log(err);
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
			<View>
				<AddPhotoIcon
					icon={theme.icons.add_photo}
					size={theme.sizes.icon_lg}
					color={theme.colors.text_light}
					left={props.imageType === "avatar"}
					right={props.imageType === "banner"}
				/>
				<StyledImage source={imageSource()} {...props} />
			</View>
		</TouchableWithoutFeedback>
	);
}

//***********
// styles
//***********

const AddPhotoIcon = styled(IconButton)`
	position: absolute;
	right: 0;
	bottom: 0;
	z-index: 10;
	margin: 0;
`;
const StyledImage = styled.Image`
	height: ${(props) => props.height}px;
	width: ${(props) => props.width}px;
	border-radius: ${(props) => props.borderRadius}px;
	background-color: ${(props) => props.theme.colors.disabled};
`;
