import React from "react";
import styleMain from "../css/App.module.css";
import ButtonInputs from "./ButtonInputs";
import { isBrowser } from "react-device-detect";

function ChooseInputs() {
  return (
    <div className="h-auto text-center w-auto">
      <h2
        className={
          isBrowser ? styleMain.HeaderMain : styleMain.HeaderMainMobile
        }
      >
        Choose inputs
      </h2>
      <div className="rounded-sm">
        <div
          className={`flex flex-col ${isBrowser ? "bg-[#E6E1E7] gap-0" : "bg-transparent gap-1.25"} rounded-sm h-auto`}
        >
          <ButtonInputs index="meaning" name="meaning" />
          <ButtonInputs index="reading-on" name="reading-on" />
          <ButtonInputs index="reading-kun" name="reading-kun" />
        </div>
      </div>
    </div>
  );
}

export default ChooseInputs;
