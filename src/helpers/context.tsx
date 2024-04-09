import React from "react";

export type ProviderProps = {
  /**
   * item content
   */
  children?: React.ReactNode;

  value?: any;
};

export function createContext<ContextValueTypes>() {
  const Context = React.createContext<ContextValueTypes | null>(null);

  const useContext = () => {
    const value = React.useContext(Context);

    return value;
  };

  const Provider = (props: ProviderProps) => {
    const { value, children } = props;

    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  return [Provider, useContext] as const;
}
