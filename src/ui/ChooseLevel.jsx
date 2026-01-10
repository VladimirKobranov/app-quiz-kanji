import React from "react";
import ButtonLevels from "./ButtonLevels";
function ChooseLevel() {
  return (
    <div className="h-auto text-center w-auto">
      <h2 className="text-[30px] md:text-[20px] font-bold text-[#868686]">
        Choose levels
      </h2>
      <div className="flex flex-col bg-transparent gap-1  rounded-sm h-auto">
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
