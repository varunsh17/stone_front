// SessionContext.ts
import { createContext } from 'react';
import { SessionData } from './session-manager';

export interface SessionContextValue {
  session: SessionData | null;
  createSession: (data: SessionData) => void;
  deleteSession: () => void;
}

const SessionStateContext = createContext<SessionContextValue | null>(null);

export  { SessionStateContext };