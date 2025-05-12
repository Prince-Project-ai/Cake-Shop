import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./features/client/toast/toastSlice.js";
import userReducer from "./features/client/userSlice.js";
import forPassword from "./features/client/ResetPassword/forgotPasswordSlice.js";
export const store = configureStore({
    reducer: {
        toast: toastReducer,
        user: userReducer,
        forgotPassword: forPassword,
        // other Reducers
    }
});