import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const LoaderContext = createContext();

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within a LoaderProvider");
  }
  return context;
};

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoader = useCallback(() => setIsLoading(true), []);
  const hideLoader = useCallback(() => setIsLoading(false), []);

  const value = useMemo(
    () => ({
      isLoading,
      showLoader,
      hideLoader,
    }),
    [isLoading, showLoader, hideLoader],
  );

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
};
