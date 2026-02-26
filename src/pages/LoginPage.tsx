import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const LoginPage = () => {
    const [token,setToken] = useState<string | null>()
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login} = useContext(AuthContext)

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        login(email,password);
    }
   


        
      
    return (
        <div>
            <h1>Login</h1>
            <p>Welcome to the login page</p>
            <form onSubmit={handleSubmit}>
            <input type="text" name = "email" 
            onChange = {(e)=> setEmail(e.target.value)} 
            ></input>

            <input type="text" name = "password" 
            onChange = {(e)=> {setPassword(e.target.value)
            }} 
            ></input>
            </form>

        </div>

    );
};

export default LoginPage;