import React, { createContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../FireConfig';


// ------------- Context pour traiter avec les données : Participations ------------------------
const ParticipationContext = createContext();

export const ParticipationProvider = ({ children }) => {
  const [participations, setParticipations] = useState([]);

  // Récupération des données 
  useEffect(() => {
    const fetchParticipations = async () => {
      const participationsCollection = collection(db, 'participations');
      const participationsSnapshot = await getDocs(participationsCollection);
      const participationsData = participationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setParticipations(participationsData);
    };

    fetchParticipations();
  }, []);

  return (
    <ParticipationContext.Provider value={{ participations }}>
      {children}
    </ParticipationContext.Provider>
  );
};

export default ParticipationContext;