import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
function ButtonInput(props) {
  const [isActive, setIsActive] = useState(false);
  const inputsFromRedux = useStore((state) => state.inputs);
  const addInput = useStore((state) => state.addInput);
  const removeInput = useStore((state) => state.removeInput);

  useEffect(() => {
    if (inputsFromRedux.length === 0) {
      setIsActive(false);
    }
  }, [inputsFromRedux]);

  function handleClick(index) {
    setIsActive(!isActive);
    if (isActive === false) {
      addInput(index);
    } else {
      removeInput(index);
    }
  }

  return (
    <div
      className={`cursor-pointer transition-all duration-200 border-none flex items-center justify-center font-bold text-[18px] h-full
        w-full md:w-[150px] rounded-md shadow-sm active:scale-95
        ${
          isActive
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
        }`}
      onClick={() => handleClick(props.index)}
    >
      {props.name}
    </div>
  );
}

export default ButtonInput;
