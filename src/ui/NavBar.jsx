import React from "react";
import ChooseLevel from "./ChooseLevel";
import ChooseInputs from "./ChooseInputs";
import Title from "./Title";
import NavControlResults from "./NavControlResults";
function NavBar() {
  return (
    <div className="flex flex-col gap-4 md:gap-5 mb-5 items-center">
      <Title />
      <ChooseLevel />
      <ChooseInputs />
      <NavControlResults />
    </div>
  );
}

export default NavBar;
