


import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [congeAnnuelResponse, compResponse, congeMResponse] = await Promise.all([
          axios.get('http://localhost:5000/findcongeannuel'),
          axios.get('http://localhost:5000/FindCongeCompensation'),
          axios.get('http://localhost:5000/getcalandermaladie')
        ]);

        const congeAnnuelList = congeAnnuelResponse.data.map((leave) => {
          if (leave.status === 'accepted') {
            return {
              title: `${leave.userid.Nom} ${leave.userid.Prenom}  - Congé Annuel`,
              start: leave.date_debut,
              end: leave.date_fin,
              allDay: true,
              color: 'green',
            };
          }
          return null;
        }).filter((event) => event !== null);

        const compList = compResponse.data.map((leave) => {
          if (leave.status === 'accepted') {
            return {
              title: `${leave.userid.Nom}  ${leave.userid.Prenom} - Congé Compensation`,
              start: leave.date_debut,
              end: leave.date_fin,
              allDay: true,
              color: 'blue',
            };
          }
          return null;
        }).filter((event) => event !== null);

        const congeMList = congeMResponse.data.map((leave) => {
          if (leave.status === 'accepted') {
            return {
              title: `${leave.userid.Nom} ${leave.userid.Prenom}  - Congé Maladie`,
              start: leave.date_debut,
              end: leave.date_fin,
              allDay: true,
              color: 'red',
            };
          }
          return null;
        }).filter((event) => event !== null);

        setEvents([...congeAnnuelList, ...compList, ...congeMList]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <FullCalendar plugins={[dayGridPlugin]} events={events} />
    </div>
  );
}

export default Calendar;
