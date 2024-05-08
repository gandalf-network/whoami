import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DialogProps } from "@/types";

export const Dialog = ({
  triggerElement,
  children,
  contentClassName,
  onOverlayClick,
  ...props
}: DialogProps) => {
  return (
    <AlertDialog {...props}>
      {triggerElement ? (
        <AlertDialogTrigger asChild>{triggerElement}</AlertDialogTrigger>
      ) : null}
      <AlertDialogContent
        className={contentClassName}
        onOverlayClick={onOverlayClick}
      >
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};
