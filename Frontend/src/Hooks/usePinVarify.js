import { useDispatch, useSelector } from "react-redux"
import { setPhase } from "../Redux/features/client/ResetPassword/forgotPasswordSlice";
import { useRef } from "react";
import { verifyOtpApi } from "../Services/ClientApi/HandleUserApi";
import useToast from "./useToast";
import { useState } from "react";

export const usePinVarify = () => {
    const dispatch = useDispatch();
    const { email } = useSelector(state => state.forgotPassword);
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(true);
    const inputRefs = useRef([]);


    const { showToast } = useToast();


    const handleBack = (e) => {
        e.preventDefault();
        dispatch(setPhase(1));
    }

    const handleChange = (e, i) => {
        const value = e.target.value;
        if (value.length === 1 && i < 5) {
            inputRefs.current[i + 1].focus();
            // setIsDisable(inputRefs.current[i].value.length < 5);
        }
        (i === 5) ? setIsDisable(false) : setIsDisable(true);
    };

    const handleKeyDown = (e, i) => {
        if (e.key === 'Backspace' && !e.target.value && i > 0) {
            inputRefs.current[i - 1].focus();
        }

    };

    const handlePinVerify = async (e) => {
        e.preventDefault();
        const otp = inputRefs.current.map(digit => digit?.value || '').join('');
        if (otp.length === 6) {
            setIsLoading(true);
            try {
                const res = await verifyOtpApi({ email, otp });
                console.log(res);
                showToast(res?.message, "success");
                dispatch(setPhase(3));
            } catch (error) {
                console.log(error);
                showToast(error?.response?.data?.message || error?.message, "error");
            } finally {
                setIsLoading(false);
            }

        } else {
            showToast("please enter all 6 digit", "error");
        }
    }

    return {
        handleBack,
        handleChange,
        handleKeyDown,
        handlePinVerify,
        inputRefs,
        isLoading,
        isDisable,
    }
}