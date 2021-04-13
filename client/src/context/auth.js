import { createContext, useReducer, useContext } from "react";

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
  const [state, dispatch] = useReducer(authReducer, { user: null });

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
