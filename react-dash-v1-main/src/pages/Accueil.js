import React, { useState, useEffect } from "react";
import axios from "axios";

const RecentCard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get("http://localhost:5000/getAllEvents");
      setEvents(response.data);
    };

    fetchEvents();
  }, []);

  return (
    < div className="container py-5">
      <div className="content grid3 mtop">
        {events.map((event) => {
          const { cover, date, event_name, description } = event;
          return (
            <div className="box shadow" key={event.id}>
              <div className='hh'>
              <img src={`http://localhost:5000/${event.image}`} height="200" width="auto" />
                        </div>
              <div className="text">
                <h4>{event.event}</h4>
             
                <p>{description}</p>
              </div>
              <div className="button flex">
                <div></div>
                <span>{event.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentCard;
