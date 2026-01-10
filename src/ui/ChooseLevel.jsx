import React from "react";
import styleMain from "../css/App.module.css";
import ButtonLevels from "./ButtonLevels";
import { isBrowser } from "react-device-detect";

function ChooseLevel() {
  return (
    <div className="h-auto text-center w-auto">
      <h2
        className={
          isBrowser ? styleMain.HeaderMain : styleMain.HeaderMainMobile
        }
      >
        Choose levels
      </h2>
      <div
        className={`flex flex-col ${isBrowser ? "bg-[#E6E1E7] gap-0" : "bg-transparent gap-1.25"} rounded-sm h-auto`}
      >
        <ButtonLevels index="5" name="N5" />
        <ButtonLevels index="4" name="N4" />
        <ButtonLevels index="3" name="N3" />
        <ButtonLevels index="2" name="N2" />
        <ButtonLevels index="1" name="N1" />
      </div>
    </div>
  );
}

export default ChooseLevel;
