import { useState, useEffect } from "react";

// Define the hook
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // check if the device is a mobile device
    const checkIsMobile = () => {
      const isMobileDevice =
        typeof window !== "undefined" && window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    // Initial check on mount
    checkIsMobile();

    // Event listener for window resize to dynamically update isMobile
    const handleResize = () => {
      checkIsMobile();
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
};
