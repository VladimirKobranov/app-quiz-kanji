import React, { useState } from "react";
import { useStore } from "../store/useStore";
import style from "../css/App.module.css";
import { BrowserView, isBrowser } from "react-device-detect";
import { Button } from "@/components/ui/button";

function NavControlResults() {
  const {
    answers: answersFromRedux,
    reset,
    toggleHint,
    hint: hintState,
  } = useStore();

  const totalQuestions = Object.keys(answersFromRedux).length;
  const correctAnswers = Object.values(answersFromRedux).map(
    (item) => item[0].correct
  );
  const correctAnswersOn = Object.values(answersFromRedux).map(
    (item) => item[0].correctOn
  );
  const correctAnswersKun = Object.values(answersFromRedux).map(
    (item) => item[0].correctKun
  );

  const correctCount =
    correctAnswers.filter((answer) => answer).length +
    correctAnswersOn.filter((answer) => answer).length +
    correctAnswersKun.filter((answer) => answer).length;

  const accuracyPercentage =
    ((correctCount / totalQuestions) * 100).toFixed(0) + "%";
  const [percentage, setPercentage] = useState("0%");
  const [questions, setQuestions] = useState("0/0");

  const handleResetClick = () => {
    reset();
  };

  const handleResultClick = () => {
    setPercentage(accuracyPercentage);
    setQuestions(`${correctCount}/${totalQuestions}`);
  };

  const handleHintClick = () => {
    toggleHint();
    console.log("hint dispatch");
  };

  return (
    <div className="text-center">
      <div
        className={`flex flex-col gap-2.5 mb-5 ${
          isBrowser ? "w-[150px]" : "w-[200px]"
        }`}
      >
        <Button
          className={`bg-[#AF282F] hover:bg-[#8A1F25] text-white ${
            isBrowser
              ? "rounded-sm h-[30px] w-[150px]"
              : "rounded-md h-[30px] w-[200px]"
          } mb-1.25`}
          onClick={() => handleResetClick()}
        >
          <span className="text-[20px]">RESET</span>
        </Button>

        <Button
          className={`bg-[#014A77] hover:bg-[#013B5F] text-white w-full h-[30px] ${
            isBrowser ? "rounded-sm" : "rounded-md"
          } mb-1.25`}
          onClick={() => handleResultClick()}
        >
          <span className="text-[20px]">RESULT</span>
        </Button>

        <BrowserView>
          <Button
            className={`w-full h-[30px] text-white ${
              isBrowser ? "rounded-sm" : "rounded-md"
            } ${hintState ? "bg-[#014A77] hover:bg-[#013B5F]" : "bg-[#d9d7dc] text-[#01111f] hover:bg-[#c2c0c5]"}`}
            onClick={() => handleHintClick()}
          >
            <span className="text-[20px]">HINT MODE</span>
          </Button>
        </BrowserView>
      </div>
      <div>
        <h3 className={isBrowser ? style.HeaderMain : style.HeaderMainMobile}>
          Accuracy
        </h3>
        <div className="flex justify-center items-center w-full">
          <p className="w-auto text-[#868686] mr-5">{questions}</p>
          <p className="w-auto text-[#868686]">{percentage}</p>
        </div>
      </div>
    </div>
  );
}

export default NavControlResults;
