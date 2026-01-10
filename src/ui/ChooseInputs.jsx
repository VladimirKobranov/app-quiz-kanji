import React from "react";
import ButtonInputs from "./ButtonInputs";
function ChooseInputs() {
  return (
    <div className="h-auto text-center w-auto">
      <h2 className="text-[30px] md:text-[20px] font-bold text-[#868686]">
        Choose inputs
      </h2>
      <div className="rounded-sm">
        <div className="flex flex-col bg-transparent gap-1 rounded-sm h-auto">
          <ButtonInputs index="meaning" name="meaning" />
          <ButtonInputs index="reading-on" name="reading-on" />
          <ButtonInputs index="reading-kun" name="reading-kun" />
        </div>
      </div>
    </div>
  );
}

export default ChooseInputs;
