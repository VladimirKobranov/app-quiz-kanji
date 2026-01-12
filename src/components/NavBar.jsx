import React from "react";
import ChooseLevel from "@/components/ChooseLevel";
import ChooseInputs from "@/components/ChooseInputs";
import Title from "@/components/Title";
import NavControlResults from "@/components/NavControlResults";
import Footer from "@/components/Footer";
function NavBar() {
  return (
    <div className="flex flex-col items-center w-full px-4 md:px-6 py-6 h-full overflow-x-hidden">
      <div className="flex-1 w-full max-w-[260px] flex flex-col items-center gap-6 md:gap-6 overflow-y-auto">
        <Title />
        <ChooseLevel />
        <ChooseInputs />
        <NavControlResults />
      </div>
      <div className="w-full mt-auto pt-6 border-t md:border-t-0 flex-none">
        <Footer />
      </div>
    </div>
  );
}

export default NavBar;
