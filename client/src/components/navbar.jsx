import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Navbar() {
    const { user } = useContext(UserContext);
    return (
        <header className="fixed w-full p-3 flex justify-between bg-primary1">
            {/* Logo */}
            <Link to='/' className='flex items-center gap-1'>
                <img className='w-10 h-10' src="./logo.png" alt="" />
                <span className='font-bold text-xl text-primary2 mb-1'>Stellar</span>
            </Link>
            
            {/* Search Bar */}
            <div className="flex items-center gap-2 bg-secondary1 border border-accent2 rounded-full py-2 px-4 shadow-md shadow-gray-300">
                <div className="text-primary2">Event Location</div>
                <div className="border-l border-accent2 px-2 text-primary2">Event Date & Time</div>
                <div className="border-l border-accent2 px-2 text-primary2">Invite Attendees</div>
                <button className="primary rounded-full px-3 py-2">
                    <i className="fi fi-rs-search"></i>
                </button>
            </div>
            
            {/* User Profile */}
            <Link to='/login' className="flex items-center gap-2 bg-secondary1 border border-accent2 rounded-full py-2 px-4 shadow-md shadow-gray-300 group">
                <div className="px-1 group-hover:text-accent1">
                    <i className="fi fi-br-menu-burger text-primary2 group-hover:text-accent1"></i>
                </div>
                <div className="px-3 py-2 bg-secondary2 rounded-full ">
                    <i className="fi fi-rr-user text-primary2 group-hover:text-accent1"></i>
                </div>
                {!!user && (
                    <div className="px-2 py-2 rounded-full ">
                        {user.name}
                    </div>
                )}
            </Link>
        </header>
    )
}
