// import { useEffect } from 'react';
// import { useLocation } from 'react-router';

// function ScrollToTop() {
//   const { pathname } = useLocation();

//   // scroll to the top of the component
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   return null;
// }

// export default ScrollToTop;

import { useEffect } from "react";

const ScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []); // only scrolls on first mount
  return null;
};

export default ScrollToTop;
