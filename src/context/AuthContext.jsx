import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
          const userData = userDoc.data();

          if (userData && userData.role !== undefined) {
            const userRole = userData.role;
            console.log('User logged in:', user.email, 'Role:', userRole);
            setCurrentUser({ ...user, role: userRole });
          } else {
            console.error('Role is not defined for user:', user.uid);
            setCurrentUser({ ...user, role: null });
          }
        } catch (err) {
          console.error('Error fetching user data:', err);
          setError('Erro ao buscar dados do usuário.');
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
