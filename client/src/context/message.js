/* eslint-disable no-case-declarations */
import { createContext, useReducer, useContext } from "react";

/**
 * @feature Message Context
 */
const MessageStateContext = createContext();
const MessageDispatchContext = createContext();

// state - { users, messages }
const messageReducer = (state = { users: [], messages: [] }, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };

    case "SET_USER_MESSAGES":
      const messages = action.payload;
      return { ...state, messages };

    case "ADD_MESSAGE":
      const { username, message } = action.payload;
      const usersWithTheOneHasNewMsg = state.users.map((user) => {
        if (user.username === username) {
          return {
            ...user,
            latestMessage: message,
          };
        } else {
          return user;
        }
      });

      return {
        ...state,
        users: usersWithTheOneHasNewMsg,
        messages: [...state.messages, message],
      };

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
