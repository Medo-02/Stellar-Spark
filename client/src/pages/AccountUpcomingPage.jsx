import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";

export default function AccountUpcomingPage() {
    const { user, ready } = useContext(UserContext);
    const [upcoming, setUpcoming] = useState([]);
    const [name, setName] = useState(''); 
    const [phone, setPhone] = useState(''); 

    useEffect(() => { 
        axios.get('/user-upcomings').then(({ data }) => {
            const mappedUpcoming = data.map(item => item.event);
            setUpcoming(mappedUpcoming);

            if (data.length > 0) {
                setName(data[0].name); 
                setPhone(data[0].phone); 
            }
        });
    }, []);
    
    if (!user && ready) return <Navigate to={'/login'} />
    return (
        <div className="page-container flex flex-col gap-4">
            <AccountNav/>
            <div className="flex justify-center items-center mt-20">
                <Link to={'/account/hosting/new'} className="py-2 px-4 bg-secondary2 text-primary2 font-bold hover:text-accent1 rounded-full flex items-center">
                    <i className="fi fi-rr-square-plus mt-1 px-2"></i> Create Event
                </Link>
            </div>
            <div className="mt-4">
                {upcoming.length > 0 && upcoming.map((event, index) => (
                    <Link to={'/event/'+event._id} key={index} className="flex flex-col relative w-[80%] mx-auto items-center md:flex-row md:items-stretch gap-2 bg-secondary2 p-4 rounded-2xl border-2 border-accent2 cursor-pointer">
                        <div className="flex relative top-1 md:absolute md:right-1 gap-4 border-2 border-primary2 rounded-xl p-2 mb-2 text-primary2 text-sm md:text-base">
                                <p className="">
                                    <i className="fi fi-rr-calendar-clock px-2"></i>
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                                <p className="">Time: {event.time}</p>
                                <p className=""><i className="fi fi-rr-marker px-2"></i>{event.location}</p>
                                <p className=""><i className="fi fi-bs-users-alt px-2"></i>{event.maxParticipants}</p>
                        </div>
                        <div className="w-[80%] md:w-[12%] aspect-square">
                            <img src={'http://localhost:4000/uploads/'+event.photos[0]} alt="" className="object-cover h-full w-full"/>
                        </div>
                        <div className="flex flex-col gap-2 w-full h-full">
                            <h3 className="text-primary2 text-base md:text-lg font-bold">{event.title}</h3>
                            <p className="text-primary2 text-sm md:text-base">Name : {name}</p>
                            <p className="text-primary2 text-sm md:text-base">Phone Number: {phone}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}