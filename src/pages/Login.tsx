import { useState, useEffect } from "react"
const Login = () => {
    const [token,setToken] = useState<string | null>()
    
    
      useEffect(()=>{
        fetch('http://localhost:3000/auth/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: {}, password: {}})
        })
        .then(res => res.json())
        .then(data =>{
          setToken(data.token);
        })
      },[])
  return (
    <div>
      
    </div>
  )
}

export default Login
