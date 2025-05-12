import { useDispatch, useSelector } from "react-redux";
import useToast from "./useToast";
import { verifyEmail } from "../Services/ClientApi/HandleUserApi";
import { useState, useCallback } from "react";
import { setEmail, setPhase } from "../Redux/features/client/ResetPassword/forgotPasswordSlice";

export const useEmailVerification = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(true);

    const { email } = useSelector(state => state.forgotPassword);

    const { showToast } = useToast();
    const dispatch = useDispatch();

    const handleEmail = useCallback((e) => {
        const inputEmail = e.target.value;
        dispatch(setEmail(inputEmail));
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsDisable(!emailRegex.test(inputEmail));
    }, [dispatch]);


    const handleVerifyMail = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("email", email);

            const res = await verifyEmail(formData);
            if (res?.statusCode === 200) {
                showToast("Code send successfully.", "success");
                dispatch(setEmail(""));
                dispatch(setPhase(2));
            }
        } catch (error) {
            showToast(error?.response?.data?.message || error?.message, "error");
        } finally {
            setIsLoading(false);
        }
    }

    return {
        handleVerifyMail,
        isLoading,
        email,
        handleEmail,
        isDisable
    }
}