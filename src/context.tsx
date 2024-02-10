import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useDebouncedCallback } from "use-debounce";

interface ContextType {
  context: any; // Change `any` to the appropriate type of your context
  updateContext: (updatedContext: any) => void; // Change `any` to the appropriate type of your context
}

export const Context = createContext<ContextType>({ context: {}, updateContext: () => {} });

interface Props {
  children: ReactNode;
}

export const ContextProvider = ({ children }: Props) => {
  const [context, setContext] = useState<any>({}); // Change `any` to the appropriate type of your context

  useEffect(() => {
    const storedContext = localStorage.getItem("context");
    console.log("GET CONTEXT", storedContext);
    storedContext ? setContext(JSON.parse(storedContext)) : setContext({});
  }, []);

  // Define a callback function to update localStorage
  const saveToLocalStorage = (updatedContext: any) => { // Change `any` to the appropriate type of your context
    localStorage.setItem("context", JSON.stringify(updatedContext));
    console.log("CONTEXT", updatedContext);
  };

  // Debounce the callback function with a delay of 1000ms
  const debouncedSaveToLocalStorage = useDebouncedCallback(
    saveToLocalStorage,
    3000
  );

  const updateContext = (updatedContext: any) => { // Change `any` to the appropriate type of your context
    setContext(updatedContext);
    debouncedSaveToLocalStorage(updatedContext);
  };

  return (
    <Context.Provider value={{ context, updateContext }}>
      {children}
    </Context.Provider>
  );
};
