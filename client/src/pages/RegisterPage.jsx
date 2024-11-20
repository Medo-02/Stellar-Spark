import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(e) {
        e.preventDefault();
        try {
            await axios.post('/register', {name, email, password});
        } catch (e) {
            alert('Registration failed');   
        }
    }

    return (
        <div className="page-container-fixed">
            <h1 className="font-bold text-primary1 text-2xl md:text-3xl lg:text-5xl mb-4">Register</h1>
            <form onSubmit={registerUser} className="container flex flex-col gap-3 max-w-sm md:max-w-md lg:max-w-lg mx-auto px-4">
                <input className="w-full p-2 rounded-md border border-accent2" type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <input className="w-full p-2 rounded-md border border-accent2" type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />
                <input className="w-full p-2 rounded-md border border-accent2" type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button className="primary rounded-full px-3 py-2" type="submit">Register</button>
            </form>
            <div className="text-accent2 mt-3">
                Already have an account? <Link className="text-primary1 hover:text-secondary2" to={'/login'}>Login</Link>
            </div>
        </div>
    )
}
