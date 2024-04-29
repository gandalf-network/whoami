"use client";

import { useMemo, useState } from "react";

import { createContext } from "@/helpers/context";
import { DialogProps } from "@/types";

import { Dialog } from "../themed/dailog";

export interface DialogContextProps {
  show: (content: DialogProps) => void;
  hide: () => void;
}

export interface DialogProviderProps {
  children?: React.ReactNode;
}

export const [DialogContextProvider, useDialogContext] =
  createContext<DialogContextProps>();

export const DialogProvider = (props: DialogProviderProps) => {
  const { children } = props;

  const [dialog, setDialog] = useState<DialogProps | undefined>(undefined);

  const show: DialogContextProps["show"] = (content) => {
    setDialog(content);
  };

  const hide: DialogContextProps["hide"] = () => {
    setDialog(undefined);
  };

  const contextValue = useMemo(() => ({ show, hide }), [show, hide]);

  return (
    <DialogContextProvider value={contextValue}>
      {children}

      {dialog ? (
        <Dialog open={!!dialog} {...dialog} onOpenChange={hide} />
      ) : null}
    </DialogContextProvider>
  );
};
