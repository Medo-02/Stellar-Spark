import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useState } from "react";

export default function Navbar() {
    const { user } = useContext(UserContext);
    const [mobileMenu, setMobileMenu] = useState(false);

    return (
        <header className="fixed w-full p-3 flex flex-col bg-primary1">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <Link to='/' className='flex items-center gap-1'>
                    <img className='w-10 h-10' src="./logo.png" alt="" />
                    <span className='font-bold text-xl text-primary2 mb-1'>Stellar</span>
            </Link>

            {/* Mobile Menu */}
            <button className="sm:hidden"
                onClick={() => setMobileMenu(!mobileMenu)}>
                <i className="fi fi-rr-menu-burger text-primary2"></i>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-4">
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
                <Link to={user?'/account':'/login'} className="flex items-center gap-2 bg-secondary1 border border-accent2 rounded-full py-2 px-4 shadow-md shadow-gray-300 group">
                    <div className="px-1 group-hover:text-accent1">
                        <i className="fi fi-br-menu-burger text-primary2 group-hover:text-accent1"></i>
                </div>
                <div className="px-3 py-2 bg-secondary2 rounded-full ">
                    <i className="fi fi-rr-user text-primary2 group-hover:text-accent1"></i>
                </div>
                {user ? user.name : 'Login'}
                </Link>
            </div>
            </div>
            {/* Mobile Menu opened */}
            {mobileMenu && (
                <div className="sm:hidden mt-4">
                        <div className="flex flex-col gap-4 bg-secondary1 rounded-lg p-4 shadow-lg">
                            {/* Mobile Search */}
                            <div className="flex items-center gap-2 bg-white rounded-lg p-2">
                                <i className="fi fi-rs-search text-primary2"></i>
                                <input 
                                    type="text" 
                                    placeholder="Search events..." 
                                    className="w-full outline-none bg-transparent"
                                />
                            </div>
                            
                            {/* Mobile Menu Items */}
                            <div className="flex flex-col gap-2">
                                <Link to="/" className="text-primary2 py-2">Event Location</Link>
                                <Link to="/" className="text-primary2 py-2">Event Date & Time</Link>
                                <Link to="/" className="text-primary2 py-2">Invite Attendees</Link>
                            </div>
                        </div>
                    <Link to={user ? '/account' : '/login'}
                        className="bg-secondary2 rounded-full w-full mx-auto px-3 py-2 mt-4 text-primary2 flex items-center gap-2"
                        onClick={() => setMobileMenu(false)}
                        >
                        <i className="fi fi-rr-user"></i>
                        {user ? user.name : 'Login'}
                    </Link>
                </div>
            )}
        </header>
    )
}
