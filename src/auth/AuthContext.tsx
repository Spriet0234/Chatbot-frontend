import { useEffect, type ReactNode, createContext, useState } from 'react'


interface AuthContextType {
        isAuthenticated: boolean
        token: string|null
        login: (token:string) => void
        logout: () => void
    }

type AuthProviderProps = {
  children: ReactNode
}



export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: AuthProviderProps) => {

  const [token,setToken] = useState<string | null>(() => localStorage.getItem("token"))
  
  const isAuthenticated = !!token

  const login = (newToken: string) => {
  setToken(newToken)
  localStorage.setItem("token", newToken)
}
  const logout = () =>{
  setToken(null)
  localStorage.removeItem("token")
}

  return (

   <AuthContext.Provider value = {{isAuthenticated: isAuthenticated, token, login, logout}}>
      {children}
    </AuthContext.Provider> 
    
    
  )
}

