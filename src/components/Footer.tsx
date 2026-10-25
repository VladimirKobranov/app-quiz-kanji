import React from "react";
import packageJson from "@/../package.json";

const d = new Date();
let year = d.getFullYear();

const link = () => (
  <a href="https://github.com/VladimirKobranov" className="hover:underline">
    copyright VK
  </a>
);

function Footer() {
  return (
    <div className="flex w-full flex-col items-center gap-1">
      <p className="text-xs font-light text-muted-foreground/50">
        v{packageJson.version}
      </p>
      <p className="text-xs font-light uppercase text-muted-foreground/50">
        {link()}&nbsp;|&nbsp;{year}
      </p>
    </div>
  );
}

export default Footer;
