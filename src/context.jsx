"use client";
import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [context, setContext] = useState({});

  useEffect(() => {
    const storedContext = localStorage.getItem("context");
    storedContext ? setContext(JSON.parse(storedContext)) : setContext({});
  }, []);

  useEffect(() => {
    localStorage.setItem("context", JSON.stringify(context));
    console.log('CONTEXT', context);
  }, [context]);

  const updateContext = (updatedContext) => {
    setContext(updatedContext);
  };

  return (
    <Context.Provider value={{ context, updateContext }}>
      {children}
    </Context.Provider>
  );
};
