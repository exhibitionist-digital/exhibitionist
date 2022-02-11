import React from "react";
import { ACMI, Jag, Mona, MonaFoma, Rising } from "../components/logos.jsx";

const Footer = () => {
  return (
    <footer>
      <p style={{ textAlign: "center", margin: "auto" }}>Our frens</p>
      <div className="frens">
        <Rising />
        <Mona />
        <ACMI />
        <Jag />
        <MonaFoma />
      </div>
    </footer>
  );
};

export default Footer;
