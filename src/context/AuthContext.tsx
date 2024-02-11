import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: null,
};

interface AuthContextType extends AuthState {
  login: (role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>(() => {
    const storedState = sessionStorage.getItem("state");
    return storedState ? JSON.parse(storedState) : initialState;
  });

  useEffect(() => {
    sessionStorage.setItem("state", JSON.stringify(state));
  });
  const login = (role: string) => {
    setState({ ...state, isAuthenticated: true, userRole: role });
  };

  const logout = () => {
    setState({ ...state, isAuthenticated: false, userRole: null });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
