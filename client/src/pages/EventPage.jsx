import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EventPage() {
    const [redirect, setRedirect] = useState('');
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);

    useEffect(() => {
        if (!id) return;
        axios.get('/events/' + id).then(res => setEvent(res.data));
    }, []);

    if (!event) return '';

    if (showAllPhotos) {
        return (
            <div className="bg-black pt-32 relative inset-0 min-h-screen p-8">
                <button
                    onClick={() => setShowAllPhotos(false)}
                    className="fixed top-24 left-4 bg-primary1 text-primary2 rounded-full px-4 py-2 shadow-md"
                >
                    <i className="fi fi-br-arrow-left px-2"></i>
                    <span>Close Gallery</span>
                </button>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-24">
                    {event.photos.length > 0 && event.photos.map((photo, index) => (
                        <img
                            key={index}
                            src={'http://localhost:4000/uploads/' + photo}
                            className="h-full w-full rounded-lg"
                            alt={`Event photo ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        );
    }

    const toggleDescription = () => setShowFullDescription(!showFullDescription);

    async function joinEvent() {

        const upcomingData = { event:event._id, name, phone }
        const res = await axios.post('/upcomings', upcomingData); 
        const upcomingId = res.data._id;

        setRedirect('/account/upcoming/' + upcomingId);
    }
    
    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="page-container bg-primary2 bg-opacity-40 text-secondary1 shadow-lg">
            <section className="header-data px-4 py-6">
                <h1 className="text-primary1 text-3xl font-semibold">{event.title}</h1>
                <div className="flex text-primary1 gap-4 my-2">
                    <a
                        className="font-semibold underline"
                        target="_blank"
                        href={'https://maps.google.com/?q=' + event.location}
                    >
                        <i className="fi fi-rr-marker align-middle"></i>
                        <span className="px-2">{event.location}</span>
                    </a>
                    <p>
                        <i className="fi fi-rr-calendar-clock px-2"></i>
                        {new Date(event.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                    <p>Time: {event.time}</p>
                </div>
            </section>

            <div className="relative px-4">
                <div className="grid gap-2 grid-cols-[2fr_1fr] h-[60vh] md:h-auto rounded-2xl overflow-hidden">
                    <div>
                        {event.photos?.[0] && (
                            <img
                                src={'http://localhost:4000/uploads/' + event.photos[0]}
                                className="h-full w-full rounded-lg"
                            />
                        )}
                    </div>
                    <div className="grid gap-2">
                        {event.photos.slice(1, 3).map((photo, index) => (
                            <img
                                key={index}
                                src={'http://localhost:4000/uploads/' + photo}
                                className="h-full w-full rounded-lg"
                                alt={`Event photo ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => setShowAllPhotos(true)}
                    className="bg-accent1 text-primary2 px-4 py-2 shadow-md rounded-lg absolute bottom-6 right-8 text-sm lg:text-lg"
                >
                    <i className="fi fi-rr-gallery px-1"></i>
                    <span className="hidden lg:inline shadow-inner">Show all photos</span>
                </button>
            </div>

            <section className="grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr] my-8 px-4">
                <div>
                    <h2 className="text-primary1 text-3xl font-semibold">Description</h2>
                    <p className="mt-4">
                        {showFullDescription
                            ? event.description
                            : `${event.description.slice(0, 100)}...`}
                    </p>
                    <button
                        onClick={toggleDescription}
                        className="text-accent1 underline mt-2"
                    >
                        {showFullDescription ? 'Show Less' : 'Show More'}
                    </button>
                </div>
                <div className="flex flex-col gap-3 p-6 items-center justify-around rounded-2xl bg-accent3 border border-accent2 shadow-2xl">
                    <p className="text-primary1 text-2xl">
                        Number of available seats:{" "}
                        <span className="font-bold">{event.maxParticipants - event.participantsCount}</span>
                    </p>
                    <div className="flex flex-col w-[80%]">
                        <div className="w-full">
                            <h3 className="text-accent2 text-base md:text-lg font-bold mb-2 text-center sm:text-left">Your full name <span className="text-red-500">*</span></h3>
                            <input type="text" placeholder="" className="w-full" value={name} onChange={e => setName(e.target.value)} />
                        </div>

                        <div className="w-full">
                            <h3 className="text-accent2 text-base md:text-lg font-bold mb-2 text-center sm:text-left">Your phone number <span className="text-red-500">*</span></h3>
                            <input type="text" placeholder="Ex. 054123456" className="w-full" value={phone} onChange={e => setPhone(e.target.value)} />
                        </div>
                    </div>
                    <button onClick={joinEvent} className="bg-primary1 text-primary2 py-3 w-[80%] rounded-2xl shadow-lg">
                        Join Now
                    </button>
                </div>
            </section>

            <section className="flex flex-col gap-6 bg-accent3 px-6 py-8 shadow-inner">
                <div>
                    <h2 className="text-primary1 text-3xl font-semibold">Features</h2>
                    <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
                        {event.features.map((feature, index) => (
                            <span
                                key={index}
                                className="border border-accent2 p-4 rounded-lg text-secondary1 text-sm md:text-base"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-primary1 text-3xl font-semibold">Extra Info</h2>
                    <p className="text-secondary1 mt-2">{event.extraInfo}</p>
                </div>
            </section>
        </div>
    );
}
