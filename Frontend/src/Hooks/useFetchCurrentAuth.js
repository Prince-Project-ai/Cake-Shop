import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { isUserLoggedIn } from "../Services/ClientApi/HandleUserApi";
import { setIsLoading, setIsLoggedIn, setUserData } from "../Redux/features/client/userSlice";

export const useFetchCurrentAuth = () => {
    const dispatch = useDispatch();

    const fetchCurrentAuth = useCallback(async () => {
        dispatch(setIsLoading(true));

        try {
            const response = await isUserLoggedIn();
            if (response?.data?.data) {
                dispatch(setUserData(response.data.data));
                dispatch(setIsLoggedIn(true));
            }
        } catch (error) {
            console.log("Authentication check failed:", error?.response?.data?.message || error.message);
            dispatch(setIsLoggedIn(false));
            dispatch(setUserData(null));
        } finally {
            dispatch(setIsLoading(false));
        }
    }, [dispatch]);

    useEffect(() => {
        fetchCurrentAuth();
    }, [fetchCurrentAuth]);

    return { fetchCurrentAuth };
};