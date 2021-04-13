import { createContext, useReducer, useContext } from "react";
import jwtDecode from "jwt-decode";

/**
 * @feature Check if the local token is available
 */
let user = null;
const token = localStorage.getItem("token");
if (token) {
  const decodedToken = jwtDecode(token);
  const expiresAt = new Date(decodedToken.exp * 1000);

  if (new Date() > expiresAt) {
    localStorage.removeItem("token");
  } else {
    user = decodedToken;
  }
} else console.log("Token not found.");

/**
 * @feature Auth Context
 */
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token);
      return { ...state, user: action.payload };

    case "LOGOUT":
      localStorage.removeItem("token");
      return { ...state, user: null };

    default:
      throw new Error(`Unknow action type: ${action.type}`);
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user });

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

const useAuthState = () => useContext(AuthStateContext);
const useAuthDispatch = () => useContext(AuthDispatchContext);

export { AuthProvider, useAuthState, useAuthDispatch };
