import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    pin: "",
    newPassword: "",
    crmPassword: "",
    phase: 2,
}

const forgotPasswordSlice = createSlice({
    name: "forgot password functionality",
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPhase: (state, action) => {
            state.phase = action.payload
        }
    }
});

export const { setEmail, setPhase } = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;