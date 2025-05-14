import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setPhase, setEmail } from "../Redux/features/client/ResetPassword/forgotPasswordSlice";
import useToast from "./useToast";
import { resetPasswordCli } from "../Services/ClientApi/HandleUserApi";
import { closeModal } from "../Redux/features/client/GlobalModel/modelSlice";

export const useResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isDisable, setIsDisable] = useState(true);
    const [formData, setFormData] = useState({
        newPass: "",
        newCrmPass: "",
    });

    const { showToast } = useToast();
    const dispatch = useDispatch();
    const { email } = useSelector(state => state.forgotPassword);


    const handleBack = (e) => {
        e.preventDefault();
        dispatch(setPhase(1));
    }

    const handleChange = useCallback((e) => {
        setFormData((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
    }, []);

    useEffect(() => {
        if (formData.newPass.length > 8 && formData.newCrmPass.length > 8) {
            setIsDisable(false);
        } else {
            setIsDisable(true);
        }

    }, [formData]);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (formData?.newPass !== formData?.newCrmPass) {
            showToast("Password do not same.", "error");
            return;
        }
        try {
            const res = await resetPasswordCli({ email, newPassword: formData["newPass"] });
            if (res?.statusCode === 200) {
                setFormData({
                    newPass: "",
                    newCrmPass: "",
                });
                showToast(res?.message || "Password Reset Successfully", "success");
                dispatch(setEmail(""));
                dispatch(closeModal());
            }
        } catch (error) {
            showToast(error?.response?.data?.message || error?.message, "error");
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,
        isDisable,
        handleBack,
        handleResetPassword,
        handleChange,
        formData,
    }
}