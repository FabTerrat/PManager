import React, { createContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../FireConfig';


// ------------- Context pour traiter avec les données : Events ------------------------
const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  // Récupération des données 
  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, 'events');
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsData = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventContext;