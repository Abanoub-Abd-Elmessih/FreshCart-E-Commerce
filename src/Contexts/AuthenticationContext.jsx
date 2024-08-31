import { createContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthContextProvider({children}){
    const [token, setToken] = useState(localStorage.getItem('token'));
    useEffect(()=>{
        token ? localStorage.setItem('token' , token): localStorage.removeItem('token')
    },[token])

    const contextValue = useMemo(() => ({
        token,
        setToken,
    }), [token]);
    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}