// modalSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    modalKey: null,     // 🔁 Replace content
    modalProps: {},     // 🔁 Optional props
    title: '',
    footer: null,
    size: 'md',
    closeOnOverlayClick: true,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            const {
                modalKey,
                modalProps = {},
                title,
                footer,
                size = 'md',
                closeOnOverlayClick = true,
            } = action.payload;

            state.isOpen = true;
            state.modalKey = modalKey;
            state.modalProps = modalProps;
            state.title = title;
            state.footer = footer || null;
            state.size = size;
            state.closeOnOverlayClick = closeOnOverlayClick;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.modalKey = null;
            state.modalProps = {};
            state.title = '';
            state.footer = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
