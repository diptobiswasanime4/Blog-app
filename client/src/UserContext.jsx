import { useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  // useEffect(async () => {
  //   const resp = await fetch("http://localhost:3000/profile");
  //   const data = await resp.json();
  //   console.log(data);
  //   setUserInfo(data);
  // }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
