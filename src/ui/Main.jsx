import React, { useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import ContentField from "./ContentField";
import { MoreHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function Main() {
  const [show, setShow] = useState(false);
  const [buttonColor, setButtonColor] = useState("#E6E1E7");
  const [buttonTextColor, setButtonTextColor] = useState("#01111FFF");

  const handleToggle = () => {
    setShow(!show);
    setButtonColor(show ? "#E6E1E7" : "#014A77FF");
    setButtonTextColor(show ? "#01111FFF" : "#E6E1E7FF");
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col">
      {/* Desktop View */}
      <div
        className="hidden md:grid grid-cols-[213px_1fr] grid-rows-[1fr_38px] h-full text-black/80 w-full"
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

      {/* Mobile View */}
      <div className="md:hidden flex flex-col h-full w-full p-5 relative overflow-hidden">
        <Sheet open={show} onOpenChange={setShow}>
          <SheetTrigger asChild>
            <div
              className="absolute w-[60px] h-[60px] flex items-center justify-center rounded-full top-5 right-[5%] z-50 cursor-pointer transition-colors shadow-lg"
              style={{ backgroundColor: buttonColor, color: "#101920" }}
              onClick={handleToggle}
            >
              <MoreHorizontal size={60} color={buttonTextColor} />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[400px] p-4 bg-white">
            <div className="mt-8">
              <NavBar />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1 overflow-hidden">
          <ContentField />
        </div>
        <div className="h-[38px]">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Main;
