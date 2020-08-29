// import React from "react";
// import { Button, Image, View } from "react-native";
// import ImagePicker from "expo-image-picker";
// import Constants from "expo-constants";
// import Permissions from "expo-permissions";
// // get dimensions
// const { width, height } = Dimensions.get("window");

// export default function ImagePicker() {
// 	useEffect(() => {
// 		getPermissionAsync();
// 	}, []);

// 	const getPermissionAsync = async () => {
// 		if (Constants.platform.ios) {
// 			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
// 			if (status !== "granted") {
// 				alert("Sorry, we need camera roll permissions to make this work!");
// 			}
// 		}
// 	};

// 	const pickImage = async () => {
// 		try {
// 			let result = await ImagePicker.launchImageLibraryAsync({
// 				mediaTypes: ImagePicker.MediaTypeOptions.images,
// 				allowsEditing: true,
// 				aspect: [4, 3],
// 				quality: 1,
// 			});
// 			if (!result.cancelled) {
// 				this.setState({ image: result.uri });
// 			}

// 			console.log(result);
// 		} catch (E) {
// 			console.log(E);
// 		}
// 	};

// 	return (
// 		<View>
// 			<Text></Text>
// 		</View>
// 	);
// }
