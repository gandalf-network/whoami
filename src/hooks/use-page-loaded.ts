import { useEffect, useState } from "react";

// Define a custom hook to check if the current page is fully loaded
const usePageLoaded = (): boolean => {
  // State to keep track of whether the page is loaded
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Function to set the page as loaded
    const handlePageLoad = () => {
      setIsPageLoaded(true);
    };

    // If the page is already loaded, set the state to true immediately
    if (document.readyState === "complete") {
      setIsPageLoaded(true);
    } else {
      // Listen for the 'load' event on the window
      window.addEventListener("load", handlePageLoad);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("load", handlePageLoad);
      };
    }
  }, []); // Empty dependency array means this effect runs once on mount

  return isPageLoaded;
};

export default usePageLoaded;
