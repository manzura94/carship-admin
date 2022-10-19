import React, { createContext, useState } from "react";

export const Context = createContext();

const UserContext = ({children}) => {
  const [user, setUser] = useState(localStorage.getItem("user") || false);
  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
    </Context.Provider>
  );
};

export default UserContext;
