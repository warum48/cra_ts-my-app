import React, { createContext, useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

//----------types------------

interface IContext {
  isDebug: boolean;
}

export const GlobalContext = createContext({} as IContext);

type Props = {
  children?: React.ReactNode;
};

//--------------component-----------

export const GlobalProvider = ({ children }: Props) => {
  const [isDebug, setIsDebug] = useState(false);

  useEffect(() => {}, []); //TODO find a way to init once on dict change and onload

  //}

  const value = {
    isDebug
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
