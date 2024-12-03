import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
export default function EventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const[showAllPhotos, setShowAllPhotos] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get('/events/' + id).then(res => {
            setEvent(res.data);
        })
    }, [])

    if (!event) return '';
    
    if (showAllPhotos) {
        return (
            <div className="bg-black pt-32 relative inset-0 min-h-screen p-8">
                <button onClick={() => setShowAllPhotos(false)} className="fixed primary rounded-full px-2 py-3 z-10">
                    <i className="fi fi-br-arrow-left px-2"></i>
                    <span>Close Gallery</span>
                </button>
                <div className="bg-black grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 relative top-20 mb-16">
                    {event.photos.length > 0 && event.photos.map((photo, index) => (
                        <img key={index} src={'http://localhost:4000/uploads/' + photo} className="h-full w-full" alt={`Event photo ${index + 1}`} />
                    ))}
                </div>
            </div>
        )
    }
    return (
        <div className="page-container px-4">
            <section>
                <h1 className="text-primary1 text-3xl">{event.title}</h1>
                <div className="my-2">
                    <a className="font-semibold" target="_blank" href={'https://maps.google.com/?q=' + event.location}>
                        <i className="fi fi-rr-marker align-middle"></i>
                        <span className="underline px-2">{event.location}</span>
                    </a>
                </div>
                <div className="relative">
                    <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden relative">
                        <div>
                            {event.photos?.[0] && (
                                <img src={'http://localhost:4000/uploads/'+event.photos[0]} className="h-full w-full"></img>
                            )}
                        </div>
                        <div className="grid gap-2">
                            {event.photos.length > 1 && event.photos.slice(1, 3).map((photo, index) => (
                                <img key={index} src={'http://localhost:4000/uploads/' + photo} className="h-full w-full" alt={`Event photo ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                    <button onClick={() => setShowAllPhotos(true)} className="primary px-3 py-2 shadow shadow-md shadow-primary1 absolute bottom-4 right-4 text-sm lg:text-lg">
                        <i className="fi fi-rr-gallery px-1"></i>
                        <span className="hidden lg:inline">Show more photos</span>
                    </button>
                </div>
            </section>
        </div>
    );
}