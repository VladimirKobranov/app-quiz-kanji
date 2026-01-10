import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
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

  const handleHover = () => {
    if (isActive) {
      return { color: "#fcfcfd", background: "#1b5c84" };
    } else {
      return { color: "#01111f", background: "#d9d7dc" };
    }
  };

  return (
    <Box
      className={isBrowser ? style.Button : style.ButtonMobile}
      onClick={() => handleClick(props.index)}
      bg={isActive ? "#014A77" : "#E6E1E7"}
      color={isActive ? "#fcfcfd" : "#868686"}
      _hover={handleHover()}
    >
      {props.name}
    </Box>
  );
}

export default ButtonLevels;
