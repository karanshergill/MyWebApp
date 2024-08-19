import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Marker = ({ currentPath }) => {
  const [markerStyle, setMarkerStyle] = useState({});
  const navRef = useRef(null);
  const markerRef = useRef(null);

  const updateMarker = (link) => {
    if (navRef.current && markerRef.current && link) {
      const linkRect = link.getBoundingClientRect();
      const navRect = navRef.current.getBoundingClientRect();

      setMarkerStyle({
        left: linkRect.left - navRect.left + "px",
        width: linkRect.width + "px",
      });
    }
  };

  useEffect(() => {
    const activeLink = document.querySelector(`nav ul li a[href='${currentPath}']`);
    if (activeLink) {
      updateMarker(activeLink);
    }

    const handleResize = () => {
      const activeLink = document.querySelector(`nav ul li a[href='${currentPath}']`);
      if (activeLink) {
        updateMarker(activeLink);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentPath]);

  useEffect(() => {
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach((link) => {
      link.addEventListener("mouseover", (e) => updateMarker(e.target));
      link.addEventListener("mouseout", () => {
        const activeLink = document.querySelector(`nav ul li a[href='${currentPath}']`);
        if (activeLink) updateMarker(activeLink);
      });
    });
  }, [currentPath]);

  return (
    <motion.div
      ref={markerRef}
      className="absolute bottom-6 h-full w-0 border-t-4 border-cyan-400 bg-gradient-to-b from-cyan-400/20 to-transparent filter drop-shadow-lg pointer-events-none"
      style={markerStyle}
      transition={{ duration: 0.5 }}
    />
  );
};

export default Marker;
