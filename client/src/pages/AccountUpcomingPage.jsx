import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";

export default function AccountUpcomingPage() {
    const { user, ready } = useContext(UserContext);
    
    if (!user && ready) return <Navigate to={'/login'} />
    return (
        <div className="page-container">
            <AccountNav />
        </div>
    )
}