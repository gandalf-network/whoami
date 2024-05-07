import { useState, useEffect } from "react";

import { checkIfMobile } from "@/helpers/utils";

// Define the hook
export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initial check
    setIsMobile(checkIfMobile());

    // Set up an event listener for screen resizing (useful for responsive designs)
    const handleResize = () => {
      setIsMobile(checkIfMobile());
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array to ensure it runs only once on component mount

  return isMobile;
};
