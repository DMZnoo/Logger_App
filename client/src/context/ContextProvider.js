import React, { useReducer } from "react";

export default (reducer, actions, initialState) => {
  const Context = React.createContext(null);

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const bindActions = {};
    for (let key in actions) {
      bindActions[key] = actions[key](dispatch);
    }
    return (
      <Context.Provider value={{ state, ...bindActions }}>
        {children}
      </Context.Provider>
    );
  };
  return { Context, Provider };
};
