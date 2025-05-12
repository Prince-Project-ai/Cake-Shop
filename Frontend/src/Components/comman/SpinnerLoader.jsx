import React from "react";
import { Loader } from "lucide-react";


const SpinnerLoader = () => {
    return (
        <div className="h-screen items-center flex overflow-hidden justify-center fixed z-100 w-screen backdrop-blur-2xl ">
            <Loader className="animate-spin text-primary-600" />
        </div>
    );
};

export default SpinnerLoader;
