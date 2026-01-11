import React, { useState } from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ContentField from "@/components/ContentField";
import { MoreHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

function Main() {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-background text-foreground">
      {/* Desktop View */}
      <div
        className="hidden md:grid grid-cols-[300px_1fr] grid-rows-[1fr_38px] h-full w-full"
        style={{ gridTemplateAreas: '"nav main" "footer footer"' }}
      >
        <div
          className="w-auto h-full border-r bg-muted/30"
          style={{ gridArea: "nav" }}
        >
          <NavBar />
        </div>
        <div style={{ gridArea: "main" }} className="h-full overflow-hidden">
          <ContentField />
        </div>
        <div
          className="pl-2 border-t bg-muted/10 flex items-center"
          style={{ gridArea: "footer" }}
        >
          <Footer />
        </div>
      </div>

      <div className="md:hidden flex flex-col h-full w-full p-5 relative overflow-hidden">
        <Sheet open={show} onOpenChange={setShow}>
          <SheetTrigger asChild>
            <div
              className={`fixed w-[60px] h-[60px] flex items-center justify-center rounded-full top-[20px] right-[20px] z-50 cursor-pointer transition-all shadow-md active:scale-95 
                ${show ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}
              `}
              onClick={handleToggle}
            >
              <MoreHorizontal size={40} />
            </div>
          </SheetTrigger>
          <SheetContent side="left" className="w-[400px] p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SheetDescription className="sr-only">
              Access the navigation menu and settings for the kanji quiz.
            </SheetDescription>
            <div className="h-full py-8 px-4 overflow-y-auto">
              <NavBar />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1 overflow-hidden">
          <ContentField />
        </div>
        <div className="h-[38px] flex items-center justify-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Main;
