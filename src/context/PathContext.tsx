import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

type PathContextType = {
  path: string;
  setPath: (path: string) => void;
};

const PathContext = createContext<PathContextType>({
  path: "/",
  setPath: () => {},
});

export const usePathContext = () => useContext(PathContext);

export const PathProvider = ({ children }: { children: React.ReactNode }) => {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    history.pushState(null, "", path);
  }, [path]);
  return (
    <PathContext.Provider value={{ path, setPath }}>
      {children}
    </PathContext.Provider>
  );
};

export const Route = ({
  children,
  targetPath,
}: {
  children: React.ReactNode;
  targetPath: string;
}) => {
  const { path } = usePathContext();
  if (path === targetPath) {
    return <div>{children}</div>;
  } else {
    return <div>{null}</div>;
  }
};
