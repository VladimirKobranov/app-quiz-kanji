import React from "react";
import ChooseInputs from "@/components/ChooseInputs";
import ChooseFilters from "@/components/ChooseFilters";
import Title from "@/components/Title";
import NavControlResults from "@/components/NavControlResults";
import Footer from "@/components/Footer";
function NavBar() {
  return (
    <div className="flex h-full w-full flex-col items-center overflow-x-hidden px-2.5 py-4 md:px-5">
      <div className="flex w-full max-w-none flex-1 flex-col items-center gap-6 overflow-y-auto md:max-w-[260px]">
        <Title />
        <ChooseFilters />
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
