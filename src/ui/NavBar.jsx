import React from "react";
import { VStack } from "@chakra-ui/react";
import ChooseLevel from "./ChooseLevel";
import ChooseInputs from "./ChooseInputs";
import Title from "./Title";
import NavControlResults from "./NavControlResults";
import { isBrowser } from "react-device-detect";

function NavBar() {
  return (
    <VStack spacing={isBrowser ? "20px" : "15px"} mb="20px">
      <Title />
      <ChooseLevel />
      <ChooseInputs />
      <NavControlResults />
    </VStack>
  );
}

export default NavBar;
