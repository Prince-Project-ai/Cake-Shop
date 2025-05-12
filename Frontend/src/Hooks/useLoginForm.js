import { useState } from "react";
import { clientLogin } from "../Services/ClientApi/HandleUserApi";
import useToast from "./useToast";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setUserData } from "../Redux/features/client/userSlice";
import { useNavigate } from "react-router-dom";


export const useLoginForm = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({ email: "", password: "" });

    try {
      const response = await clientLogin(formData);
      console.log(response);
      if (response?.data?.statusCode === 200) {
        showToast(response?.data?.message, "success");

        dispatch(setUserData(response?.data?.data?.currentAuth));
        dispatch(setIsLoggedIn(true));
        navigate("/");
      }
    } catch (error) {
      showToast(error?.response?.data?.message || error?.message, "error");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    formData,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    setShowPassword,
  };
};
