import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function EventFormPage() {
    const [redirect, setRedirect] = useState(false);
    //Event data
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('');
    const [photos, setPhotos] = useState([]);
    const [features, setFeatures] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');

    useEffect(() => {
        if (!id) {
            return; 
        }
        axios.get('/events/' + id).then(res => {
            const { data } = res;
            setTitle(data.title);
            setDescription(data.description);
            setLocation(data.location)
            const eventDate = new Date(data.date);
            const formattedDate = eventDate.toISOString().split('T')[0];
            setDate(formattedDate);
            setTime(data.time);
            setType(data.type);
            setPhotos(data.photos);
            setFeatures(data.features);
            setExtraInfo(data.extraInfo);
            setMaxParticipants(data.maxParticipants);
        });
    }, [id]);

    const featureOptions = [
    'Free Parking',
    'Food Provided',
    'Wheelchair Accessible',
    'Family Friendly',
    'Pet Friendly'
    ];

    async function saveEvent(e) {
        e.preventDefault();
        const eventData = {
            title, description, location,
            date, time, type, photos,
            features, extraInfo, maxParticipants
        }

        if (!id) {
            await axios.post('/events', eventData); 
        } else {
           await axios.put('/events', {id, ...eventData});  
        }

        setRedirect(true);
    }

    const handleFeatureChange = (feature) => {
        setFeatures(prev => {
            if (prev.includes(feature)) {
                return prev.filter(selected => selected !== feature);
            } else {
                return [...prev, feature];
            }
        });
    }

    if (redirect) {
        return <Navigate to={'/account/hosting'} />
    }

    return (
        <div className="page-container flex flex-col gap-4">
            <AccountNav/>
            <div className="flex flex-col gap-4 w-full px-4 sm:w-[75%] mx-auto">
                <h1 className="font-bold text-primary1 text-2xl md:text-3xl lg:text-5xl mb-4 text-center sm:text-left">
                    {id && (
                        <span>Edit Event</span>
                    )}
                    {!id && (
                        <span>Create New Event</span>
                    )}
                </h1>  
                <form onSubmit={saveEvent} className="flex flex-col gap-4 items-center">
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Event Title <span className="text-red-500">*</span></h2>
                            <input type="text" placeholder="Add the title of the event" className="w-full" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Event Description</h2>
                            <textarea className="w-full" placeholder="Add a description of the event" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Event Location</h2>
                            <input type="text" placeholder="Add the location of the event" className="w-full" value={location} onChange={e => setLocation(e.target.value)} />
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Event Date & Time <span className="text-red-500">*</span></h2>
                            <div className="flex gap-2">
                                <input type="date" placeholder="Add the date of the event" className="w-full" value={date} onChange={e => setDate(e.target.value)} />
                                <input type="input" placeholder="14:00" className="w-full" value={time} onChange={e => setTime(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Event Type</h2>
                            <select className="w-full" value={type} onChange={e => setType(e.target.value)}>
                                <option value="professional">Professional</option>
                                <option value="social">Social</option>
                                <option value="educational">Educational</option>
                                <option value="charity">Charity</option>
                                <option value="entertainment">Entertainment</option>  
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <PhotosUploader photos={photos} onChange={setPhotos}/>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Features</h2> 
                            <div className="grid gap-2 place-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {featureOptions.map((feature) => (
                                    <label key={feature} className="border border-accent2 p-4 rounded-2xl w-full text-accent2 text-sm md:text-base flex items-center gap-2">
                                        <input 
                                        type="checkbox"
                                        checked={features.includes(feature)}
                                            onChange={() => handleFeatureChange(feature)}
                                        />
                                        <span>{feature}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Extra Info</h2> 
                            <input type="text" placeholder="Add any additional information" className="w-full" value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />
                        </div>
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Max Participants <span className="text-red-500">*</span></h2>
                            <input type="number" placeholder="Specify the maximum number of participants" className="w-full" value={maxParticipants} onChange={e => setMaxParticipants(e.target.value)} />
                        </div>
                    <button className="primary rounded-full px-3 py-2 w-[90%] sm:w-[60%] md:w-[40%] lg:w-[20%] mt-2 mb-4 mx-auto" type="submit">
                        Save
                    </button>
                </form>
            </div>
        </div>
    )
}