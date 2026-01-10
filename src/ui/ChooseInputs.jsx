import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import styleMain from "../css/App.module.css";
import ButtonInputs from "./ButtonInputs";
import { isBrowser } from "react-device-detect";

function ChooseInputs() {
  return (
    <Box h="auto" textAlign="center" w="auto">
      <Text
        className={
          isBrowser ? styleMain.HeaderMain : styleMain.HeaderMainMobile
        }
      >
        Choose inputs
      </Text>
      <Box rounded="2px">
        <VStack
          bg={isBrowser ? "#E6E1E7" : ""}
          rounded="2px"
          h="auto"
          spacing={isBrowser ? "0" : "5px"}
        >
          <ButtonInputs index="meaning" name="meaning" />
          <ButtonInputs index="reading-on" name="reading-on" />
          <ButtonInputs index="reading-kun" name="reading-kun" />
        </VStack>
      </Box>
    </Box>
  );
}

export default ChooseInputs;
