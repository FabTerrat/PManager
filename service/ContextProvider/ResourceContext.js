import React, { createContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../FireConfig';


// ------------- Context pour traiter avec les données : Resources  ------------------------
const ResourceContext = createContext();

export const ResourceProvider = ({ children }) => {
  const [resources, setResources] = useState([]);

  // Récupération des données 
  useEffect(() => {
    const fetchResources = async () => {
      const resourcesCollection = collection(db, 'resources');
      const resourcesSnapshot = await getDocs(resourcesCollection);
      const resourcesData = resourcesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResources(resourcesData);
    };

    fetchResources();
  }, []);

  return (
    <ResourceContext.Provider value={{ resources }}>
      {children}
    </ResourceContext.Provider>
  );
};

export default ResourceContext;