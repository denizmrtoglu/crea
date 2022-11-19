import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import auth from "./auth";
import product from "./product";

const reducer = combineReducers({
  auth,
  product,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
