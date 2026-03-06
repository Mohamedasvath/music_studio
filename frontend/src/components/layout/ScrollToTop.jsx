import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Page maarum pothu scroll-a 0,0 (Top Left) ku kondu pogum
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;