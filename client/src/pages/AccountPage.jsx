import { useContext } from "react";
import { Link } from "react-router-dom";
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
            <nav className="w-full flex justify-center items-center gap-4">
                <Link className="py-2 px-4 bg-secondary2 text-primary2 hover:text-accent1 rounded-full text-sm md:text-base">My Profile</Link>
                <Link to={'/account/upcoming'} className="py-2 px-4 text-accent1 hover:text-secondary2 text-sm md:text-base">My Upcoming Events</Link>
                <Link to={'/account/hosting'} className="py-2 px-4 text-accent1 hover:text-secondary2 text-sm md:text-base">Events I'm Hosting</Link>
            </nav>
            <div className="flex flex-col gap-4 mx-auto md:mx-0 mt-16 max-w-sm md:max-w-md lg:max-w-lg">
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