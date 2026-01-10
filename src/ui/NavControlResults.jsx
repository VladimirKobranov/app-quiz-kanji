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
    <div className="text-center w-full max-w-[200px] md:max-w-[150px] bg-background">
      <div className="flex flex-col gap-2.5 mb-5 w-full">
        <Button
          variant="destructive"
          className="rounded-md h-[40px] md:h-[30px] w-full font-bold shadow-sm"
          onClick={() => handleResetClick()}
        >
          RESET
        </Button>

        <Button
          variant="default"
          className="rounded-md h-[40px] md:h-[30px] w-full font-bold shadow-sm"
          onClick={() => handleResultClick()}
        >
          RESULT
        </Button>

        <div className="hidden md:block">
          <Button
            variant={hintState ? "default" : "outline"}
            className="rounded-md h-[40px] md:h-[30px] w-full font-bold"
            onClick={() => handleHintClick()}
          >
            HINT MODE
          </Button>
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-[24px] md:text-[20px] font-bold text-muted-foreground">
          Accuracy
        </h3>
        <div className="flex flex-col items-center gap-1">
          <p className="text-[20px] md:text-[16px] font-medium text-muted-foreground/80">
            {questions}
          </p>
          <p className="text-[36px] md:text-[28px] font-bold text-primary">
            {percentage}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NavControlResults;
