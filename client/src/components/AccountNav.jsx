import { Link, useLocation } from "react-router-dom";

export default function AccountNav() {
    const { pathname } = useLocation();
    let subpage = pathname.split('/')?.[2] || 'profile';
    
    function linkClasses(type = null) {
        let classes = "py-2 px-4 rounded-full flex items-center ";
        if (type === subpage) {
            classes += "bg-secondary2 text-primary2 hover:text-accent1 text-center text-sm md:text-md lg:text-lg";
        } else {
            classes += "bg-gray-500 text-accent1 hover:text-secondary2 text-center text-xs md:text-md lg:text-lg";
        }
        return classes;
    }

    return (
        <nav className="w-full flex justify-center items-center gap-4">
            <Link to={'/account'} className={linkClasses('profile')}>
                <i className="fi fi-rr-user mt-1 px-1"></i> My Profile
            </Link>
            <Link to={'/account/upcoming'} className={linkClasses('upcoming')}>
                <i className="fi fi-rr-calendar-lines mt-1 px-1"></i> My Upcoming Events
            </Link>
            <Link to={'/account/hosting'} className={linkClasses('hosting')}>
                <i className="fi fi-rr-calendar-star mt-1 px-1"></i> Events I'm Hosting
            </Link>
        </nav>
    );
}