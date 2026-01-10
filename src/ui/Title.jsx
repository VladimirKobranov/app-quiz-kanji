import React from "react";
import style from "../css/Title.module.css";
import { isBrowser } from "react-device-detect";

function Title() {
  return (
    <div
      className={`flex flex-col items-center w-full ${
        isBrowser ? "mb-2.5 mt-6" : "mb-0 mt-0"
      }`}
    >
      <div
        className={`flex flex-col items-center ${isBrowser ? "gap-2.5" : "gap-5"}`}
      >
        <h1 className={isBrowser ? style.TitleKanji : style.TitleKanjiMobile}>
          漢字 クイズ
        </h1>
        <p
          className={`${
            isBrowser ? style.TitleMain : style.TitleMainMobile
          } text-[#868686]`}
        >
          KANJI QUIZ
        </p>
      </div>
    </div>
  );
}

export default Title;
