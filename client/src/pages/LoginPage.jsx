import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    async function loginUser(e) {
        e.preventDefault();
        try {
            const {data} = await axios.post('/login', { email, password });
            setUser(data);
            setRedirect(true);
        } catch (e) {
            alert('Login failed');   
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="page-container-fixed">
            <h1 className="font-bold text-primary1 text-2xl md:text-3xl lg:text-5xl mb-4">Login</h1>   
            <form onSubmit={loginUser} className="container mx-auto px-4 flex flex-col gap-3 max-w-sm md:max-w-md lg:max-w-lg">
                <input className="w-full p-2 rounded-md border border-accent2" required type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input className="w-full p-2 rounded-md border border-accent2" required type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="primary rounded-full px-3 py-2" type="submit">Login</button>
            </form>
            <div className="text-accent2 mt-3">
                Don't have an account? <Link className="text-primary1 hover:text-secondary2" to={'/register'}>Register</Link>
            </div>
        </div>
    )
}
