import { createContext, useReducer, useContext } from "react";

/**
 * @feature Message Context
 */
const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

// state - { users, messages }
const messageReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };

    case "SET_USER_MESSAGES":
      const messages = action.payload;
      return { ...state, messages };

    default:
      throw new Error(`Unknow action type: ${action.type}`);
  }
};

const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, { users: null });

  return (
    <MessageDispatchContext.Provider value={dispatch}>
      <MessageStateContext.Provider value={state}>
        {children}
      </MessageStateContext.Provider>
    </MessageDispatchContext.Provider>
  );
};

const useMessageState = () => useContext(MessageStateContext);
const useMessageDispatch = () => useContext(MessageDispatchContext);

export { MessageProvider, useMessageState, useMessageDispatch };
