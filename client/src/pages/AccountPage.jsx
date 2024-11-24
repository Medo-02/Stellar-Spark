import { useContext } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AccountPage() {
    const { user, ready, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    if (!user && ready) return <Navigate to={'/login'} />

    async function logout() {
        await axios.post('/logout');
        navigate('/');
        setUser(null);
    }
    
    return (
        <div className="page-container flex flex-col">
            <AccountNav />
            <div className="flex flex-col gap-4 mx-auto mt-32 max-w-sm md:max-w-md lg:max-w-lg">
                <h1 className="text-primary1 text-2xl md:text-3xl lg:text-4xl font-bold">Personal Information</h1>
                <div className="flex flex-col gap-2">
                    <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2">Full name</h2>
                    <p className="text-accent2 text-sm md:text-base">{user.name}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2">Email</h2>
                    <p className="text-accent2 text-sm md:text-base">{user.email}</p>
                </div>
                <button onClick={logout} className="danger rounded-full py-2 text-sm md:text-base">Logout</button>
            </div>
        </div>
    )
}