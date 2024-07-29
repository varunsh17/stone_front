// NavigationContext.js
import { createContext } from 'react';

interface NavigationContextValue {
location: string;
navigate: (path: string, props?: {}) => void;
props: {};
}
  
export const NavigationContext = createContext<NavigationContextValue | null>(null);