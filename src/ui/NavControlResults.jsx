import React, { useState } from "react";
import { useStore } from "../store/useStore";
import { Button } from "@/components/ui/button";
import { RotateCcw, BarChart3, Lightbulb } from "lucide-react";

function NavControlResults() {
  const {
    answers,
    reset,
    toggleHint,
    hint: hintState,
  } = useStore();

  const totalQuestions = Object.keys(answers).length;
  const correctAnswers = Object.values(answers).map(
    (item) => item[0].correct
  );
  const correctAnswersOn = Object.values(answers).map(
    (item) => item[0].correctOn
  );
  const correctAnswersKun = Object.values(answers).map(
    (item) => item[0].correctKun
  );

  const correctCount =
    correctAnswers.filter((answer) => answer).length +
    correctAnswersOn.filter((answer) => answer).length +
    correctAnswersKun.filter((answer) => answer).length;

  const accuracyPercentage =
    totalQuestions > 0
      ? ((correctCount / totalQuestions) * 100).toFixed(0) + "%"
      : "0%";
  const [percentage, setPercentage] = useState(null);
  const [questions, setQuestions] = useState(null);

  const handleResetClick = () => {
    reset();
    setPercentage(null);
    setQuestions(null);
  };

  const handleResultClick = () => {
    setPercentage(accuracyPercentage);
    setQuestions(`${correctCount}/${totalQuestions}`);
  };

  const handleHintClick = () => {
    toggleHint();
  };

  // Calculate percentage number for the ring
  const percentNum = percentage ? Number.parseInt(percentage) : 0;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentNum / 100) * circumference;

  return (
    <div className="w-full">
      {/* Control Buttons */}
      <div className="flex flex-col gap-2 mb-4">
        <Button
          variant="destructive"
          className="h-10 md:h-8 w-full font-semibold gap-2"
          onClick={handleResetClick}
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>

        <Button
          variant="default"
          className="h-10 md:h-8 w-full font-semibold gap-2"
          onClick={handleResultClick}
        >
          <BarChart3 className="h-4 w-4" />
          Result
        </Button>

        <div className="hidden md:block">
          <Button
            variant={hintState ? "default" : "outline"}
            className="h-10 md:h-8 w-full font-semibold gap-2"
            onClick={handleHintClick}
          >
            <Lightbulb
              className={`h-4 w-4 ${hintState ? "fill-current" : ""}`}
            />
            Hint Mode
          </Button>
        </div>
      </div>

      {/* Accuracy Display */}
      <div className="rounded-xl border bg-card p-4 text-center">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Accuracy
        </h3>

        {percentage ? (
          <div className="flex flex-col items-center gap-3">
            {/* Circular Progress */}
            <div className="relative w-20 h-20">
              <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className={`transition-all duration-500 ${
                    percentNum >= 70
                      ? "text-green-500"
                      : percentNum >= 40
                        ? "text-yellow-500"
                        : "text-red-500"
                  }`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">{percentage}</span>
              </div>
            </div>

            {/* Score */}
            <div className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{questions}</span>
              <span className="ml-1">correct</span>
            </div>
          </div>
        ) : (
          <div className="py-4 text-sm text-muted-foreground/60">
            Click Result to see your score
          </div>
        )}
      </div>
    </div>
  );
}

export default NavControlResults;
