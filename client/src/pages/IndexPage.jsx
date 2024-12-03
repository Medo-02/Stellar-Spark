import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    axios.get('/events').then(res => {
      setEvents([...res.data, ...res.data, ...res.data, ...res.data, ...res.data, ...res.data, ...res.data, ])
    });
  }, [])
  return (
    <div className="page-container px-8 grid gap-x-8 gap-y-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {events.length > 0 && events.map((event, index) => (
        <Link to={'/event/'+event._id} key={index} className="cursor-pointer border-2 border-accent2 rounded-2xl p-4">
          <div className="aspect-square mb-1">
            {event.photos?.[0] && (
              <img src={'http://localhost:4000/uploads/'+event.photos[0]} className="rounded-2xl object-cover h-full w-full"></img>
            )}
          </div>
          <h2 className="text-sm text-primary1 font-bold"><i className="fi fi-rr-marker"></i><span className="px-1">{event.location}</span></h2>
          <h3 className="text-sm text-accent2">{event.title}</h3>
          <div className="mt-2 text-primary1">
            <i className="fi fi-bs-users-alt"></i> Number of Participants <span className="font-bold"> { event.maxParticipants } </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
