import React, { useEffect, useState } from "react";
import style from "../css/MyButton.module.css";
import { useStore } from "../store/useStore";
import { isBrowser } from "react-device-detect";

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
      className={`${isBrowser ? style.Button : style.ButtonMobile} cursor-pointer transition-colors duration-200 ${
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

export default ButtonLevels;
