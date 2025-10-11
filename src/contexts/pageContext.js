import { createContext, useEffect, useState } from "react";

export const pageContext = createContext();

export const PageProvider = ({ children }) => {
  const [page, setPage] = useState("Home");
  useEffect(() => {
    console.log(page);
  }, [page]);

  return (
    <pageContext.Provider value={{ page, setPage }}>
      {children}
    </pageContext.Provider>
  );
};
