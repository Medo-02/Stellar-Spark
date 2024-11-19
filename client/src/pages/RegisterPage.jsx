import { Link } from "react-router-dom";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center mx-auto">
            <h1 className="font-bold text-primary1 text-2xl md:text-3xl lg:text-5xl mb-4">Register</h1>
            <form className="container flex flex-col gap-3 max-w-sm md:max-w-md lg:max-w-lg mx-auto px-4">
                <input className="w-full p-2 rounded-md border border-accent2" type="text" placeholder="Full Name" />
                <input className="w-full p-2 rounded-md border border-accent2" type="email" placeholder="Email" />
                <input className="w-full p-2 rounded-md border border-accent2" type="password" placeholder="Password" />
                <button className="primary rounded-full px-3 py-2" type="submit">Register</button>
            </form>
            <div className="text-accent2 mt-3">
                Already have an account? <Link className="text-primary1 hover:text-secondary2" to={'/login'}>Login</Link>
            </div>
        </div>
    )
}
