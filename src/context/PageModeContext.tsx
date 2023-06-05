import { createContext, useContext, useState } from "react";

const PageModeContext = createContext({
  darkMode: false,
  setDarkMode: (darkMode: boolean) => {},
});

export const usePageMode = () => useContext(PageModeContext);

export const PageModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <PageModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </PageModeContext.Provider>
  );
};

export const ModePage = ({ children }: { children: React.ReactNode }) => {
  const { darkMode } = usePageMode();
  if (darkMode) {
    return (
      <div style={{ background: "black", color: "white" }}>{children}</div>
    );
  } else {
    return (
      <div style={{ background: "white", color: "black" }}>{children}</div>
    );
  }
};
