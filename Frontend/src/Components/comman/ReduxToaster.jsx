import React from "react";
import { Toaster } from "react-hot-toast";

const ReduxToaster = () => (
    <Toaster position="top-center" reverseOrder={false}
        toastOptions={{
            style: {
                maxWidth: "700px",
            },
        }}
    />
);

export default ReduxToaster;