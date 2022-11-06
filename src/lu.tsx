import { useEffect, useRef, useState } from "react";
import useAsset from "ultra/hooks/use-asset.js";

const Split = ({ children }) => {
  return <div className="split">{children}</div>;
};

const Video = ({ src, alt }) => {
  const el = useRef();
  const [x, setX] = useState(0);
  const check = () => {
    const { top, height } = el.current.getBoundingClientRect();
    // 0 = 100%
    const y = (100 - ((top / 2) - height)) / (height / 50);
    const w = window.innerWidth < 800 ? 100 : 50;
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
      className="xxx"
      ref={el}
      style={{ width: `${x}%`, opacity: `${x * 2}%` }}
    >
      <img src={useAsset(src)} alt={alt} />
    </div>
  );
};

export { Split, Video };
