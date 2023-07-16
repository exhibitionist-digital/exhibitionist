import { useEffect, useRef, useState } from "react";
import useAsset from "ultra/hooks/use-asset.js";

const Split = ({ children }) => {
  return <div className="split">{children}</div>;
};

const Image = ({ src, alt }) => {
  const el = useRef();
  const [x, setX] = useState(0);
  const checkVisible = () => {
    const rect = el.current.getBoundingClientRect();
    const viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight,
    );
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
  };
  const check = () => {
    // if (!checkVisible()) return;
    const { top, height } = el.current.getBoundingClientRect();
    const y = (100 - ((top / 2) - height)) / (height / 50);
    const w = window.innerHeight > window.innerWidth ? 100 : 50;
    setX(y > w ? w : y);
  };
  useEffect(() => {
    if (el.current) {
      window.addEventListener("scroll", check, { passive: true });
      check();
    }
    return () => {
      window.removeEventListener("scroll", check);
    };
  }, [el]);
  return (
    <div
      className="slider"
      ref={el}
      style={{ opacity: `${x * 1.25}%` }}
    >
      <img src={useAsset(src)} alt={alt} />
    </div>
  );
};

export { Image, Split };
