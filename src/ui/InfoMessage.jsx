import React from "react";
import Content from "../css/contentField.module.css";
import { isBrowser } from "react-device-detect";

function InfoMessage() {
  return (
    <div className={isBrowser ? "w-[500px]" : "w-auto"}>
      <p
        className={
          isBrowser ? Content.infoGreetingsJap : Content.infoGreetingsJapMobile
        }
      >
        いらっしゃいませ!
      </p>
      <p
        className={`${
          isBrowser
            ? Content.infoGreetingsEngl
            : Content.infoGreetingsEnglMobile
        } mb-5`}
      >
        or greetings!
      </p>
      <p
        className={`${
          isBrowser
            ? Content.infoGreetingsText
            : Content.infoGreetingsTextMobile
        } mb-5`}
      >
        Welcome to the Kanji Quiz App.
        <br />
        Here, you can practice with N5 to N1 Kanji levels, along with their
        meanings and On'yomi and Kun'yomi readings.
      </p>
      <p
        className={`${
          isBrowser
            ? Content.infoGreetingsText
            : Content.infoGreetingsTextMobile
        } mb-5`}
      >
        First, select the desired level or even several levels.
        <br />
        Then, input your options. (On'yomi and Kun'yomi readings require a
        Japanese keyboard.)
      </p>
      <p
        className={`${
          isBrowser
            ? Content.infoGreetingsText
            : Content.infoGreetingsTextMobile
        } mb-5`}
      >
        A blue card indicates a correct answer, while a red card indicates an
        incorrect one. <br />
        After you're done, press the "Results" button to see your accuracy
        percentage.
      </p>
      <p
        className={`${
          isBrowser
            ? Content.infoGreetingsText
            : Content.infoGreetingsTextMobile
        } mb-5`}
      >
        Press the "Reset" button to start over.
      </p>
      <p
        className={`${
          isBrowser
            ? Content.infoGreetingsText
            : Content.infoGreetingsTextMobile
        } mb-5`}
      >
        Good luck!
      </p>
      <p
        className={
          isBrowser
            ? Content.infoGreetingsGoodLuckJap
            : Content.infoGreetingsGoodLuckJapMobile
        }
      >
        頑張って!
      </p>
    </div>
  );
}

export default InfoMessage;
