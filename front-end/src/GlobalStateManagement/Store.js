import React, { createContext, useReducer } from "react";
import ItemReducer from "./Reducer/ItemReducer";

const initialState = {
  items: []
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(ItemReducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
