import React from "react";

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
      <p className="font-light text-xs uppercase text-muted-foreground/50">
        {link()}&nbsp;|&nbsp;{year}
      </p>
    </div>
  );
}

export default Footer;
