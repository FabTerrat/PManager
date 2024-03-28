import React, { createContext, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import db from '../FireConfig';

const ContributionContext = createContext();

export const ContributionProvider = ({ children }) => {
  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchContributions = async () => {
      const contributionsCollection = collection(db, 'contributions');
      const contributionsSnapshot = await getDocs(contributionsCollection);
      const contributionsData = contributionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContributions(contributionsData);
    };

    fetchContributions();
  }, []);

  return (
    <ContributionContext.Provider value={{ contributions }}>
      {children}
    </ContributionContext.Provider>
  );
};

export default ContributionContext;