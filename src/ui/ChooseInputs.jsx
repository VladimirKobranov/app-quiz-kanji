import React from "react";
import { useStore } from "../store/useStore";
import { Button } from "../components/ui/button";

const INPUTS = [
  { index: "meaning", name: "meaning" },
  { index: "reading-on", name: "reading-on" },
  { index: "reading-kun", name: "reading-kun" },
];

function ChooseInputs() {
  const inputsFromStore = useStore((state) => state.inputs);
  const addInput = useStore((state) => state.addInput);
  const removeInput = useStore((state) => state.removeInput);

  const handleClick = (index) => {
    if (inputsFromStore.includes(index)) {
      removeInput(index);
    } else {
      addInput(index);
    }
  };

  return (
    <div className="h-auto text-center w-auto">
      <h2 className="text-[30px] md:text-[20px] font-bold text-[#868686]">
        Choose inputs
      </h2>
      <div className="rounded-sm">
        <div className="flex flex-col bg-transparent gap-1 rounded-sm h-auto">
          {INPUTS.map((input) => (
            <Button
              key={input.index}
              variant={
                inputsFromStore.includes(input.index) ? "default" : "secondary"
              }
              className="w-full md:w-37.5 text-[18px]"
              onClick={() => handleClick(input.index)}
            >
              {input.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChooseInputs;
