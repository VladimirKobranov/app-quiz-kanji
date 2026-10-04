import React, { useState } from "react";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import ContentField from "@/components/ContentField";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { LAYOUT } from "@/config/constants";

function Main() {
  const [show, setShow] = useState(false);

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col bg-background text-foreground">
      {/* Desktop View */}
      <div className="hidden md:flex h-full w-full">
        <div
          style={{ width: LAYOUT.SIDEBAR_WIDTH }}
          className="h-full border-r bg-muted/30 flex flex-col flex-none"
        >
          <NavBar />
        </div>
        <div className="flex-1 h-full overflow-hidden">
          <ContentField />
        </div>
      </div>

      <div className="md:hidden flex flex-col h-full w-full relative">
        <Sheet open={show} onOpenChange={setShow}>
          {!show && (
            <button
              type="button"
              aria-label="Open menu"
              className="fixed right-3 top-3 z-50 flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-md transition-all active:scale-95 md:right-5 md:top-5 md:size-15"
              onClick={handleToggle}
            >
              <Menu className="size-6 md:size-8" />
            </button>
          )}
          <SheetContent
            side="left"
            showClose={false}
            className="!w-full !max-w-none p-0"
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute right-3 top-3 z-10 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-all active:scale-95 md:right-5 md:top-5 md:size-15"
              onClick={handleToggle}
            >
              <Menu className="size-6 md:size-8" />
            </button>
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
