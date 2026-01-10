import React from "react";
import ChooseLevel from "./ChooseLevel";
import ChooseInputs from "./ChooseInputs";
import Title from "./Title";
import NavControlResults from "./NavControlResults";
function NavBar() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 items-center w-full px-4 md:px-6 py-6 h-full overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-[260px] flex flex-col items-center gap-6 md:gap-8">
        <Title />
        <ChooseLevel />
        <ChooseInputs />
        <NavControlResults />
      </div>
    </div>
  );
}

export default NavBar;
