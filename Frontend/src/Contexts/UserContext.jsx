import { createContext, useContext, useState } from "react";

const UserContext = createContext();


export const useUserData = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("user context inside must be use in user context");
    return context;
}


const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    






    const contextValue = {

    }

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}


