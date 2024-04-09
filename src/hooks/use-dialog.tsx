import {
  DialogContextProps,
  useDialogContext,
} from "@/components/providers/dialog";

export const useDialog = useDialogContext as () => DialogContextProps;
