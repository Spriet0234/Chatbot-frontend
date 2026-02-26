import { Navigate } from "react-router-dom"
import { useAuth } from "./useAuth"
import type { ReactNode } from "react"

type AuthProps = {
    children: ReactNode
}

export const RequireAuth = ({children}:AuthProps) => {

    const {isAuthenticated} = useAuth()

    if(!isAuthenticated){
        return <Navigate to="/login"/>
    
    }
    return <>{children}</>
}