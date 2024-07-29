// SessionProvider.ts
import React, { useState } from 'react';
import SessionManager, { SessionData } from './session-manager';
import { SessionStateContext } from './sessionContext';

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState(SessionManager.getSession());

  const createSession = (data: SessionData) => {
    SessionManager.createSession(data);
    setSession(data);
  };

  const deleteSession = () => {
    SessionManager.deleteSession();
    setSession(null);
  };

  return (
    <SessionStateContext.Provider value={{ session, createSession, deleteSession }}>
      {children}
    </SessionStateContext.Provider>
  );
};

export default SessionProvider;