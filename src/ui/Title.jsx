import React from "react";
import { Center, Text, VStack } from "@chakra-ui/react";
import style from "../css/Title.module.css";
import { isBrowser } from "react-device-detect";

function Title() {
  return (
    <Center
      w="auto"
      mb={isBrowser ? "10px" : "0"}
      mt={isBrowser ? "25px" : "0"}
    >
      <VStack spacing={isBrowser ? "10px" : "20px"}>
        <Text className={isBrowser ? style.TitleKanji : style.TitleKanjiMobile}>
          漢字 クイズ
        </Text>
        <Text
          className={isBrowser ? style.TitleMain : style.TitleMainMobile}
          color="#868686"
        >
          KANJI QUIZ
        </Text>
      </VStack>
    </Center>
  );
}

export default Title;

