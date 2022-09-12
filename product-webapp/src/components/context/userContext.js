import { createContext, useContext, useState } from "react";

export const userContext = createContext({
  user: null,
  logIn: () => {},
  logOut: () => {},
});

const USER = {  isGuestUser: true };

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(USER);
  function logIn(emailId,userRole) {
    setUser({ isGuestUser: false, name: emailId,role:userRole });
  }
  function logOut() {
    setUser(USER);
  }
  return (
    <userContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  const { user, logIn, logOut } = useContext(userContext);

  return { user, logIn, logOut };
}