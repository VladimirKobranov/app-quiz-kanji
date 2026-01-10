import React, { useEffect, useState } from "react";
import style from "../css/MyButton.module.css";
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
      className={`cursor-pointer transition-colors duration-200 border-none flex items-center justify-center font-bold text-[18px] h-full
        w-[180px] md:w-[150px] rounded-md md:rounded-sm
        ${
          isActive
            ? "bg-[#014A77] text-[#fcfcfd] hover:bg-[#1b5c84]"
            : "bg-[#E6E1E7] text-[#868686] hover:bg-[#d9d7dc] hover:text-[#01111f]"
        }`}
      onClick={() => handleClick(props.index)}
    >
      {props.name}
    </div>
  );
}

export default ButtonInput;
