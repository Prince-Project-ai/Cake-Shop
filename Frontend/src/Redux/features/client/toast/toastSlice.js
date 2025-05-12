import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const toastSlice = createSlice({
    name: 'toast',
    initialState: {}, // No state needed
    reducers: {
        showToast: (_, action) => {
            const { message, type } = action.payload;
            const displayMessage = typeof message !== 'string' ? JSON.stringify(message) : message;
            if (type === 'success') {
                toast.success(displayMessage);
            } else {
                toast.error(displayMessage);
            }
        }
    }
});


export const { showToast } = toastSlice.actions;
export default toastSlice.reducer;