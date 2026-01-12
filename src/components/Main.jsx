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
      <div className="hidden md:flex h-full w-full">
        <div className="w-[300px] h-full border-r bg-muted/30 flex flex-col flex-none">
          <NavBar />
        </div>
        <div className="flex-1 h-full overflow-hidden">
          <ContentField />
        </div>
      </div>

      <div className="md:hidden flex flex-col h-full w-full relative">
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
            <div className="h-full overflow-hidden">
              <NavBar />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex-1 overflow-hidden">
          <ContentField />
        </div>
      </div>
    </div>
  );
}

export default Main;
