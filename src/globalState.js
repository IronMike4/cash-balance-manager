import React, { createContext, useReducer, useContext } from "react";

// Initial state of the global context
const initialState = {
  balance: 0,
};

// Reducer function to handle state updates based on action types
const reducer = (state, action) => {
  switch (action.type) {
    case "DEPOSIT":
      // Increase balance by the deposit amount
      return { ...state, balance: state.balance + action.payload };
    case "WITHDRAW":
      // Decrease balance by the withdrawal amount
      return { ...state, balance: state.balance - action.payload };
    case "ADD_INTEREST":
      // Increase balance by 5% interest
      return { ...state, balance: state.balance * 1.05 };
    case "CHARGES":
      // Decrease balance by 15% for charges
      return { ...state, balance: state.balance * 0.85 };
    default:
      // Return the current state if action type is not recognized
      return state;
  }
};

// Create context for global state management
const GlobalStateContext = createContext();

// Provider component to wrap the app and provide global state
export const GlobalStateProvider = ({ children }) => {
  // Initialize state and dispatch function with useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to access global state and dispatch function
export const useGlobalState = () => useContext(GlobalStateContext);
