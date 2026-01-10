import React from "react";
import style from "../css/Footer.module.css";

const d = new Date();
let year = d.getFullYear();

const link = () => (
  <a href="https://github.com/VladimirKobranov" className="hover:underline">
    copyright VK
  </a>
);

function Footer() {
  return (
    <div className="flex justify-center w-full">
      <p className={`${style.footer}`}>
        {link()}&nbsp;|&nbsp;{year}
      </p>
    </div>
  );
}

export default Footer;
