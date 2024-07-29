// SessionManager.ts
export interface SessionData {
    // userId: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    type: string;
    // Add other session data as needed
  }
  
  class SessionManager {
    private static SESSION_KEY = 'user_session';
  
    public static createSession(data: SessionData) {
      localStorage.setItem(SessionManager.SESSION_KEY, JSON.stringify(data));
    }
  
    public static getSession(): SessionData | null {
      const sessionData = localStorage.getItem(SessionManager.SESSION_KEY);
      return sessionData ? JSON.parse(sessionData) : null;
    }
  
    public static updateSession(data: SessionData) {
      SessionManager.createSession(data);
    }
  
    public static deleteSession() {
      localStorage.removeItem(SessionManager.SESSION_KEY);
    }
  }
  
  export default SessionManager;