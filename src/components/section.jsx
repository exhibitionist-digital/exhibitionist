import React, { useEffect, useState } from "react";

const Section = ({ children, ref, style, key }) => {
  const [height, setHeight] = useState("100vh");
  const [mounted, setMounted] = useState(false);
  const isMobileDevice = () => {
    return typeof window.orientation !== "undefined";
  };
  const size = () => {
    if (isMobileDevice()) return;
    else {
      let h = window.innerHeight;
      setHeight(h + "px");
    }
  };
  const orient = () => {
    setTimeout(() => {
      let h = window.innerHeight;
      setHeight(h + "px");
    }, 300);
  };
  useEffect(() => {
    let h = window.innerHeight;
    setHeight(h + "px");
    setMounted(true);
    window.addEventListener("resize", size);
    window.addEventListener("orientationchange", orient);
    return () => {
      window.removeEventListener("resize", size);
      window.removeEventListener("orientationchange", orient);
    };
  }, []);

  return (
    <section
      ref={ref}
      key={key}
      style={{ height, opacity: mounted ? 1 : 0 }}
    >
      {children}
    </section>
  );
};

export default Section;
