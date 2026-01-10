import React, { useEffect, useState } from "react";
import { useStore } from "../store/useStore";
function ButtonLevels(props) {
  const [isActive, setIsActive] = useState(false);
  const levelsFromRedux = useStore((state) => state.levels);
  const addLevel = useStore((state) => state.addLevel);
  const removeLevel = useStore((state) => state.removeLevel);

  useEffect(() => {
    if (levelsFromRedux.length === 0) {
      setIsActive(false);
    }
  }, [levelsFromRedux]);

  function handleClick(index) {
    setIsActive(!isActive);
    if (!isActive) {
      addLevel(index);
    } else {
      removeLevel(index);
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

export default ButtonLevels;
