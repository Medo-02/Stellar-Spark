import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";

export default function AccountHostingPage() {
    const { user, ready } = useContext(UserContext);

    if (!user && ready) return <Navigate to={'/login'} />
    return (
        <div className="page-container flex flex-col gap-4">
            <AccountNav/>
            <div className="flex justify-center items-center mt-20">
                <Link to={'/account/hosting/new'} className="py-2 px-4 bg-secondary2 text-primary2 font-bold hover:text-accent1 rounded-full flex items-center">
                    <i className="fi fi-rr-square-plus mt-1 px-2"></i> Create Event
                </Link>
            </div>
        </div>
    )
}