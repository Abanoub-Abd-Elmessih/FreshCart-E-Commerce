import { createContext, useEffect, useMemo, useState } from "react";

export const EmailContext = createContext()

export default function EmailContextProvider({children}){
    const [theEmail, setTheEmail] = useState(localStorage.getItem('email'))

    useEffect(()=>{
        theEmail ? localStorage.setItem('email' , theEmail) : localStorage.removeItem('email')
    },[theEmail])
    const EmailContextValue = useMemo(() => ({
        theEmail,
        setTheEmail,
    }), [theEmail]);
    return <EmailContext.Provider value={EmailContextValue}>
        {children}
    </EmailContext.Provider>
}