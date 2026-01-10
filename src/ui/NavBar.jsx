import React from "react";
import ChooseLevel from "./ChooseLevel";
import ChooseInputs from "./ChooseInputs";
import Title from "./Title";
import NavControlResults from "./NavControlResults";
import { isBrowser } from "react-device-detect";

function NavBar() {
  return (
    <div
      className={`flex flex-col ${isBrowser ? "gap-5" : "gap-4"} mb-5 items-center`}
    >
      <Title />
      <ChooseLevel />
      <ChooseInputs />
      <NavControlResults />
    </div>
  );
}

export default NavBar;
