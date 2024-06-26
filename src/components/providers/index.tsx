import { DialogProvider } from "./dialog";
import { ThemeProvider } from "./theme";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = (props: AppProviderProps) => {
  const { children } = props;

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DialogProvider>{children}</DialogProvider>
    </ThemeProvider>
  );
};
