import { type ReactNode } from 'react'
import { createContext } from 'react'


interface AuthContextType {
        isAuthenticated: boolean
    }

type AuthProviderProps = {
  children: ReactNode
}
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: AuthProviderProps) => {


    

  return (
    <AuthContext.Provider value = {{isAuthenticated: false}}>
      {children}
    </AuthContext.Provider>
  )
}

