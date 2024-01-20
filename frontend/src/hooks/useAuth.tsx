import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  login: (token: string) => void;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  setIsLoggedIn: () => {
    console.log("toogling isLoggedIn state - default");
  },
  login: (token: string) => {
    console.log("user logged in -default", token);
  },
  logout: () => {
    console.log("user logged out - default");
  },
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export enum LocalStorageAuth {
  QUIZIFY_TOKEN = "quizify-token",
}
export const AuthContextWrapper = ({ children }: { children: ReactNode }) => {
  const isTokenAvailable = !!localStorage.getItem(
    LocalStorageAuth.QUIZIFY_TOKEN
  );
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isTokenAvailable);

  const login = (token: string) => {
    localStorage.setItem(LocalStorageAuth.QUIZIFY_TOKEN, token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem(LocalStorageAuth.QUIZIFY_TOKEN);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
