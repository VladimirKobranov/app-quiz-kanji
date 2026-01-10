import React, { useState } from "react";
import { useStore } from "../store/useStore";
import style from "../css/App.module.css";
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
    <div className="text-center w-full max-w-[200px] md:max-w-[150px]">
      <div className="flex flex-col gap-2.5 mb-5 w-full">
        <Button
          className="bg-[#AF282F] hover:bg-[#8A1F25] text-white rounded-md md:rounded-sm h-[30px] w-full mb-1.25"
          onClick={() => handleResetClick()}
        >
          <span className="text-[20px]">RESET</span>
        </Button>

        <Button
          className="bg-[#014A77] hover:bg-[#013B5F] text-white rounded-md md:rounded-sm h-[30px] w-full mb-1.25"
          onClick={() => handleResultClick()}
        >
          <span className="text-[20px]">RESULT</span>
        </Button>

        <div className="hidden md:block">
          <Button
            className={`w-full h-[30px] text-white rounded-sm ${hintState ? "bg-[#014A77] hover:bg-[#013B5F]" : "bg-[#d9d7dc] text-[#01111f] hover:bg-[#c2c0c5]"}`}
            onClick={() => handleHintClick()}
          >
            <span className="text-[20px]">HINT MODE</span>
          </Button>
        </div>
      </div>
      <div>
        <h3 className="text-[30px] md:text-[20px] font-bold text-[#868686]">
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
