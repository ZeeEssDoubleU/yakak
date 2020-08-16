// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyDwp0ZoarBCZzM2GbQZ3hI9_aM-l3mUNVE",
	authDomain: "yakak-2f383.firebaseapp.com",
	databaseURL: "https://yakak-2f383.firebaseio.com",
	projectId: "yakak-2f383",
	storageBucket: "yakak-2f383.appspot.com",
	messagingSenderId: "8961659756",
	appId: "1:8961659756:web:8ec59f4ccc2efe1758d949",
	measurementId: "G-V4TN4RQQH6",
};

// Initialize Firebase
const firebaseInit = firebase.initializeApp(firebaseConfig);
export default firebaseInit;
export const firebase_auth = firebaseInit.auth();
export const firebase_firestore = firebaseInit.firestore();
// export const firebase_analytics = firebaseInit.analytics();
