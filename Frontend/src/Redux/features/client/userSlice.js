import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false,
    isLoading: true,
}

const userSlice = createSlice({
    name: 'current user data',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.user = action.payload;
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        }
    }
});

export const { setUserData, setIsLoggedIn, setIsLoading } = userSlice.actions;

export default userSlice.reducer;