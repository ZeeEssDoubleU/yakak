import { CacheManager } from "react-native-expo-image-cache";

export const cacheImage = async (downloadURL) => {
	try {
		// image cached to app memory on device
		const cachedURL = await CacheManager.get(downloadURL).getPath();

		return cachedURL;
	} catch (error) {
		// TODO: further define error params
		console.log(error);
	}
};
