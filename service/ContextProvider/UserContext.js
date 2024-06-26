import React, { createContext, useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import db from '../FireConfig';


// ------------- Context pour traiter avec les données : Users ------------------------
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  // Récupération des données 
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  // Suppression d'un utilisateur en utilisant son id
  const deleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, 'users', id));
      setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <UserContext.Provider value={{ users, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;