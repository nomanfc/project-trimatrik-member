import { useState, useEffect, createContext, useContext } from "react";
import Cookies from "js-cookie";

import React from "react";

/* Context */
export const UserContext = createContext(null);

/* Provider */
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //setUser
  useEffect(() => {
    const currentUser = Cookies.get("user");
    currentUser && setUser(JSON.parse(currentUser));
    setLoading(false);
  }, []);

  const login = (user) => {
    setUser(user);
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
  };

  const logout = () => {
    Cookies.set("user", null);
    setUser(null);
  };
  return (
    <UserContext.Provider value={{ user, login, logout, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

/* Consumer Hook */
export const useUserContext = () => useContext(UserContext);

export default UserProvider;
