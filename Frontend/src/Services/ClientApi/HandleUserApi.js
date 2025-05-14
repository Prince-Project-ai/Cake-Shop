import axios from "axios"

export const API = axios.create(
    {
        baseURL: "http://localhost:6633/api/client",
        withCredentials: true,
    }
)

export const clientLogin = async (formData) => {
    return await API.post("/sign-in", formData,
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
}
export const clientRegis = async (formData) => {
    return await API.post("/sign-up", formData,
        {
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
}

export const isUserLoggedIn = async () => {
    return await API.get("/client-current-auth", {
        withCredentials: true,
    });
};

export const refreshAccessToken = async () => {
    return await API.get("/refresh-access-token",
        {
            withCredentials: true,
        });
}

export const verifyEmail = async (formData) => {
    const res = await API.post("/verify-email", formData, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return res?.data;
}

export const verifyOtpApi = async (otp) => {
    const res = await API.post("/verify-otp", otp, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return res?.data;
}

export const resetPasswordCli = async (formPassword) => {
    const res = await API.post("/reset-password", formPassword, {
        headers: {
            "Content-Type": "application/json",
        }
    });
    return res?.data;
}