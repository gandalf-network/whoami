import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export interface DialogProps
  extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
  children?: React.ReactNode;

  /**Function */
  onOverlayClick?: () => void;

  /**Element */
  triggerElement?: React.ReactNode;

  /**class name */
  contentClassName?: string;
}

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
