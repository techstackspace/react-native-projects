import { createContext, ReactNode } from "react";

// Optionally use the Context API to store and share data across components
interface MovieProviderProps {
  children: ReactNode;
}

interface MovieContextType {}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

const MovieProvider = ({ children }: MovieProviderProps) => {
  return <MovieContext.Provider value={{}}>{children}</MovieContext.Provider>;
};

export { MovieContext, MovieProvider };
