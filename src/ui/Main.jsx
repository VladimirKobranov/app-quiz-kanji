import React, { useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import ContentField from "./ContentField";
import { BrowserView, MobileView } from "react-device-detect";
import { MoreHorizontal } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function Main() {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState("");
  const [buttonColor, setButtonColor] = useState("#E6E1E7");
  const [buttonTextColor, setButtonTextColor] = useState("#01111FFF");

  const handleToggle = () => {
    setShow(!show);
    setDisplay(display === "none" ? "" : "none");
    setButtonColor(buttonColor === "#E6E1E7" ? "#014A77FF" : "#E6E1E7");
    setButtonTextColor(
      buttonTextColor === "#01111FFF" ? "#E6E1E7FF" : "#01111FFF"
    );
  };

  return (
    <div>
      <BrowserView>
        <div
          className="grid grid-cols-[213px_1fr] grid-rows-[1fr_38px] h-full text-black/80"
          style={{ gridTemplateAreas: '"nav main" "footer footer"' }}
        >
          <div className="w-[213px] h-full" style={{ gridArea: "nav" }}>
            <NavBar />
          </div>
          <div style={{ gridArea: "main" }} className="h-full overflow-hidden">
            <ContentField />
          </div>
          <div className="pl-2" style={{ gridArea: "footer" }}>
            <Footer />
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div className="w-auto h-[90%] m-5 relative">
          <Collapsible open={show} onOpenChange={setShow}>
            <CollapsibleTrigger asChild>
              <div
                className="absolute w-[60px] h-[60px] flex items-center justify-center rounded-full top-1 right-[5%] z-50 cursor-pointer transition-colors"
                style={{ backgroundColor: buttonColor, color: "#101920" }}
                onClick={handleToggle}
              >
                <MoreHorizontal size={60} color={buttonTextColor} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-16">
              <NavBar />
            </CollapsibleContent>
          </Collapsible>
          <div style={{ display: display }}>
            <ContentField />
          </div>
          <Footer />
        </div>
      </MobileView>
    </div>
  );
}

export default Main;
