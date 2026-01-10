import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import style from "../css/MyButton.module.css";
import { useStore } from "../store/useStore";
import { isBrowser } from "react-device-detect";

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

export default ButtonInput;
