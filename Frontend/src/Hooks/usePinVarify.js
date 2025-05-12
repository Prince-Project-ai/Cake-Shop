import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPhase } from "../Redux/features/client/ResetPassword/forgotPasswordSlice";

export const usePinVarify = () => {
    const dispatch = useDispatch();

    const handleBack = (e) => {
        e.preventDefault();
        dispatch(setPhase(1));
    }

    return {
        handleBack
    }
}