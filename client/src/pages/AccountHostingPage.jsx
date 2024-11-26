import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import AccountNav from "../components/AccountNav";

export default function AccountHostingPage() {
    const { user, ready } = useContext(UserContext);
    const { action } = useParams();

    //Event data
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [type, setType] = useState('');
    const [photos, setPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [features, setFeatures] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');

    const featureOptions = [
    'Free Parking',
    'Food Provided',
    'Wheelchair Accessible',
    'Family Friendly',
    'Pet Friendly'
    ];

    const handleFeatureChange = (feature) => {
        setFeatures(prev => {
            if (prev.includes(feature)) {
                return prev.filter(selected => selected !== feature);
            } else {
                return [...prev, feature];
            }
        });
    }

    async function addPhotoByLink(e) {
        e.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        setPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }
    
    function uploadPhoto(e) {
        const files = e.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i]);
        }

        axios.post('/upload-by-files', data, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
            const { data: filenames } = res;
            setPhotos(prev => {
                return [...prev, ...filenames];
            });
        });
    }

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
                        <div className="w-full">
                            <h2 className="text-accent2 text-base md:text-lg font-bold border-b border-accent2 mb-2 text-center sm:text-left">Photos</h2>
                            <div className="flex gap-2">
                                <input className="w-full" type="text" placeholder="Add the link of the photo" value={photoLink} onChange={e => setPhotoLink(e.target.value)} />
                                <button onClick={addPhotoByLink} className="primary rounded-full px-3 py-2">Add Photo</button>
                            </div>
                            <p className="text-accent2 text-sm md:text-base font-bold text-center sm:text-left">or Upload Photos</p>
                            <div className="flex gap-2">
                                {photos.length > 0 && (
                                    photos.map((link, index) => (
                                    <div key={index} className="w-[30%] md:w-[25%] aspect-square">
                                        <img src={'http://localhost:4000/uploads/'+link} alt="" className="object-cover h-full w-full"/>
                                    </div>
                                    ))
                                )}
                                <div className="w-[30%] md:w-[25%] flex aspect-square">
                                    <label className="w-full flex items-center justify-center cursor-pointer transparent rounded-md border-2 border-dashed border-accent2 text-sm md:text-2xl lg:text-4xl">
                                        <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                                        <i className="fi fi-tr-cloud-upload-alt mr-2"></i>Upload
                                    </label>
                                </div>
                            </div>
                        </div>
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
                        <button className="primary rounded-full px-3 py-2 w-[90%] sm:w-[60%] md:w-[40%] lg:w-[20%] mt-2 mx-auto" type="submit">Create Event</button>
                    </form>
                </div>
            )}
        </div>
    )
}