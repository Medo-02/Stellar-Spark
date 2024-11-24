import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";

export default function AccountHostingPage() {
    const { user, ready } = useContext(UserContext);
    const { action } = useParams();
    
    if (!user && ready) return <Navigate to={'/login'} />
    return (
        <div className="page-container flex flex-col gap-4">
            <AccountNav />
            {action !== 'new' && (
                <div className="flex justify-center items-center mt-20">
                    <Link to={'/account/hosting/new'} className="py-2 px-4 bg-secondary2 text-primary2 font-bold hover:text-accent1 rounded-full flex items-center">
                        <i className="fi fi-rr-square-plus mt-1 px-2"></i> Create Event
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div className="flex flex-col gap-4 w-full px-4 sm:w-[75%] mx-auto">
                    <h1 className="font-bold text-primary1 text-2xl md:text-3xl lg:text-5xl mb-4 text-center sm:text-left">Create New Event</h1>  
                    <form className="flex flex-col gap-4 items-center">
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Event Title <span className="text-red-500">*</span></h2>
                            <input type="text" placeholder="Add the title of the event" className="w-full" />
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Event Description</h2>
                            <textarea className="w-full" placeholder="Add a description of the event"></textarea>
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Event Location</h2>
                            <input type="text" placeholder="Add the location of the event" className="w-full" />
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Event Date & Time <span className="text-red-500">*</span></h2>
                            <input type="date" placeholder="Add the date and time of the event" className="w-full" />
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Event Type</h2>
                            <select className="w-full">
                                <option value="professional">Professional</option>
                                <option value="social">Social</option>
                                <option value="educational">Educational</option>
                                <option value="charity">Charity</option>
                                <option value="entertainment">Entertainment</option>  
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Photos</h2>
                            <div className="flex gap-2">
                                <input className="w-full" type="text" placeholder="Add the link of the photo" />
                                <button className="primary rounded-full px-3 py-2">Add Photo</button>
                            </div>
                            <p className="text-accent2 text-sm md:text-base font-bold text-center sm:text-left">or Upload Photos</p>
                            <input type="file" multiple className="w-full" />
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Features</h2> 
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                <label className="text-accent2 text-sm md:text-base flex items-center gap-2">
                                    <input type="checkbox" />
                                    <span>Feature 1</span>
                                </label>
                                <label className="text-accent2 text-sm md:text-base flex items-center gap-2">
                                    <input type="checkbox" />
                                    <span>Feature 2</span>
                                </label>
                                <label className="text-accent2 text-sm md:text-base flex items-center gap-2">
                                    <input type="checkbox" />
                                    <span>Feature 3</span>
                                </label>
                                <label className="text-accent2 text-sm md:text-base flex items-center gap-2">
                                    <input type="checkbox" />
                                    <span>Feature 4</span>
                                </label>
                                <label className="text-accent2 text-sm md:text-base flex items-center gap-2">
                                    <input type="checkbox" />
                                    <span>Feature 5</span>
                                </label>
                            </div>
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Extra Info</h2> 
                            <input type="text" placeholder="Add any additional information" className="w-full" />
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Max Participants <span className="text-red-500">*</span></h2>
                            <input type="number" placeholder="Specify the maximum number of participants" className="w-full" />
                        </div>
                        <button className="primary rounded-full px-3 py-2 w-[90%] sm:w-[60%] md:w-[40%] lg:w-[20%] mt-2 mx-auto" type="submit">Create Event</button>
                    </form>
                </div>
            )}
        </div>
    )
}