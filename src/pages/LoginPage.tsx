import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate, Navigate } from "react-router-dom";
import { apiRequest } from "../api/apiClient";

export default function LoginPage() {

    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    if (isAuthenticated) return <Navigate to="/app" replace />;
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        try {
            const {token} = await apiRequest<{token:string}>("/auth/login",{
                method: "POST",
                body: JSON.stringify({
                    email: fd.get("email"),
                    password: fd.get("password")
                })
            })
            login(token);
            navigate("/app",{replace:true})
        } catch(err){
            setError(err instanceof Error ? err.message : "Login failed")
        }
    }

    

      
    return (
         <div className="login-page">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        {error && <p className="error">{error}</p>}
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>

    );
};


