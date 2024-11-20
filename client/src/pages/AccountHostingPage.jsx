import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AccountHostingPage() {
    const { user, ready } = useContext(UserContext);
    
    if (!user && ready) return <Navigate to={'/login'} />
    return (
        <div className="page-container">
            <nav className="w-full flex justify-center items-center gap-4">
                <Link to={'/account'} className="py-2 px-4 text-accent1 hover:text-secondary2">My Profile</Link>
                <Link to={'/account/upcoming'} className="py-2 px-4 text-accent1 hover:text-secondary2">My Upcoming Events</Link>
                <Link className="py-2 px-4 bg-secondary2 text-primary2 hover:text-accent1 rounded-full">Events I'm Hosting</Link>
            </nav>
        </div>
    )
}