// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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

// Initialize firebase
firebase.initializeApp(firebaseConfig);
const firebase_auth = firebase.auth();
const firebase_firestore = firebase.firestore();
const firebase_storage = firebase.storage();
export {
	firebase as default,
	firebase_auth,
	firebase_firestore,
	firebase_storage,
};
