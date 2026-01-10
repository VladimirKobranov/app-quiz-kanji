import { Box, Text } from "@chakra-ui/react";
import Content from "../css/contentField.module.css";
import React from "react";
import { isBrowser } from "react-device-detect";

function InfoMessage() {
  return (
    <Box width={isBrowser ? "500px" : "auto"}>
      <Text
        className={
          isBrowser ? Content.infoGreetingsJap : Content.infoGreetingsJapMobile
        }
      >
        いらっしゃいませ!
      </Text>
      <Text
        className={
          isBrowser
            ? Content.infoGreetingsEngl
            : Content.infoGreetingsEnglMobile
        }
        mb="20px"
      >
        or greetings!
      </Text>
      <Text
        className={
          isBrowser
            ? Content.infoGreetingsText
            : Content.infoGreetingsTextMobile
        }
        mb="20px"
      >
        Welcome to the Kanji Quiz App.
        <br />
        Here, you can practice with N5 to N1 Kanji levels, along with their
        meanings and On'yomi and Kun'yomi readings.
      </Text>
      <Text
        className={
          isBrowser
            ? Content.infoGreetingsText
            : Content.infoGreetingsTextMobile
        }
        mb="20px"
      >
        First, select the desired level or even several levels.
        <br />
        Then, input your options. (On'yomi and Kun'yomi readings require a
        Japanese keyboard.)
      </Text>
      <Text
        className={
          isBrowser
            ? Content.infoGreetingsText
            : Content.infoGreetingsTextMobile
        }
        mb="20px"
      >
        A blue card indicates a correct answer, while a red card indicates an
        incorrect one. <br />
        After you're done, press the "Results" button to see your accuracy
        percentage.
      </Text>
      <Text
        className={
          isBrowser
            ? Content.infoGreetingsText
            : Content.infoGreetingsTextMobile
        }
        mb="20px"
      >
        Press the "Reset" button to start over.
      </Text>
      <Text
        className={
          isBrowser
            ? Content.infoGreetingsText
            : Content.infoGreetingsTextMobile
        }
        mb="20px"
      >
        Good luck!
      </Text>
      <Text
        className={
          isBrowser
            ? Content.infoGreetingsGoodLuckJap
            : Content.infoGreetingsGoodLuckJapMobile
        }
      >
        頑張って!
      </Text>
    </Box>
  );
}

export default InfoMessage();
