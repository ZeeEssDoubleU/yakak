import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
// import reducers
import authReducer from "./authSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
