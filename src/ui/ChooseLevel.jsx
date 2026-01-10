import React from "react";
import { useStore } from "../store/useStore";
import { Button } from "../components/ui/button";

const LEVELS = [
  { index: "5", name: "N5" },
  { index: "4", name: "N4" },
  { index: "3", name: "N3" },
  { index: "2", name: "N2" },
  { index: "1", name: "N1" },
];

function ChooseLevel() {
  const levelsFromStore = useStore((state) => state.levels);
  const addLevel = useStore((state) => state.addLevel);
  const removeLevel = useStore((state) => state.removeLevel);

  const handleClick = (index) => {
    if (levelsFromStore.includes(index)) {
      removeLevel(index);
    } else {
      addLevel(index);
    }
  };

  return (
    <div className="h-auto text-center w-auto">
      <h2 className="text-[30px] md:text-[20px] font-bold text-[#868686]">
        Choose levels
      </h2>
      <div className="flex flex-col bg-transparent gap-1 rounded-sm h-auto">
        {LEVELS.map((level) => (
          <Button
            key={level.index}
            variant={
              levelsFromStore.includes(level.index) ? "default" : "secondary"
            }
            className="w-full md:w-[150px] font-bold text-[18px]"
            onClick={() => handleClick(level.index)}
          >
            {level.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ChooseLevel;
