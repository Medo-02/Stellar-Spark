import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center mx-auto">
            <h1 className="font-bold text-primary1 text-2xl md:text-3xl lg:text-5xl mb-4">Login</h1>   
            <form className="container mx-auto px-4 flex flex-col gap-3 max-w-sm md:max-w-md lg:max-w-lg">
                <input className="w-full p-2 rounded-md border border-accent2" type="email" placeholder="Email" />
                <input className="w-full p-2 rounded-md border border-accent2" type="password" placeholder="Password" />
                <button className="primary rounded-full px-3 py-2" type="submit">Login</button>
            </form>
            <div className="text-accent2 mt-3">
                Don't have an account? <Link className="text-primary1 hover:text-secondary2" to={'/register'}>Register</Link>
            </div>
        </div>
    )
}
