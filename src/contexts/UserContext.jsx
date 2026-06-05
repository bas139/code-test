import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { checkBadges } from '../utils/gamification';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    xp: 0,
    solvedProblems: [],
    badges: []
  });

  // Simulated fetching from Firestore
  useEffect(() => {
    if (user) {
      const savedData = localStorage.getItem(`user_data_${user.uid}`);
      if (savedData) {
        setUserData(JSON.parse(savedData));
      } else {
        // Migration: If new user, migrate old local storage data if exists
        const oldSolved = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
        const oldXp = parseInt(localStorage.getItem('userXP') || '0', 10);
        const newData = {
          xp: oldXp,
          solvedProblems: oldSolved,
          badges: []
        };
        const newBadges = checkBadges(newData);
        newData.badges = newBadges;
        
        setUserData(newData);
        localStorage.setItem(`user_data_${user.uid}`, JSON.stringify(newData));
      }
    } else {
      // Guest mode
      const oldSolved = JSON.parse(localStorage.getItem('solvedProblems') || '[]');
      const oldXp = parseInt(localStorage.getItem('userXP') || '0', 10);
      setUserData({
        xp: oldXp,
        solvedProblems: oldSolved,
        badges: checkBadges({ xp: oldXp, solvedProblems: oldSolved })
      });
    }
  }, [user]);

  const addXP = (amount) => {
    setUserData(prev => {
      const newData = { ...prev, xp: prev.xp + amount };
      newData.badges = checkBadges(newData);
      if (user) localStorage.setItem(`user_data_${user.uid}`, JSON.stringify(newData));
      else localStorage.setItem('userXP', newData.xp.toString());
      return newData;
    });
  };

  const markProblemSolved = (problemId) => {
    setUserData(prev => {
      if (prev.solvedProblems.includes(problemId)) return prev;
      const newSolved = [...prev.solvedProblems, problemId];
      const newData = { ...prev, solvedProblems: newSolved };
      newData.badges = checkBadges(newData);
      
      if (user) localStorage.setItem(`user_data_${user.uid}`, JSON.stringify(newData));
      else localStorage.setItem('solvedProblems', JSON.stringify(newSolved));
      return newData;
    });
  };

  return (
    <UserContext.Provider value={{ userData, addXP, markProblemSolved }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
