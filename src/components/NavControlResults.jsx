import React, { useState } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { RotateCcw, BarChart3, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

function NavControlResults() {
  const { answers, reset, toggleHint, hint: hintState } = useStore();

  const totalQuestions = Object.keys(answers).length;
  const correctAnswers = Object.values(answers).map((item) => item[0].correct);
  const correctAnswersOn = Object.values(answers).map(
    (item) => item[0].correctOn,
  );
  const correctAnswersKun = Object.values(answers).map(
    (item) => item[0].correctKun,
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

  const percentNum = percentage ? Number.parseInt(percentage) : 0;
  const chartData = [{ score: percentNum, fill: "var(--color-score)" }];
  const chartConfig = {
    score: {
      label: "Accuracy",
      color: "var(--chart-2)",
    },
  };

  return (
    <Card className="w-full max-w-xs border-border bg-card p-4">
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
            variant="outline"
            className="h-10 md:h-8 w-full font-semibold gap-2"
            onClick={handleResultClick}
          >
            <BarChart3 className="h-4 w-4" />
            Result
          </Button>

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

        {/* Accuracy Display */}
        <div className="rounded-xl border bg-card p-4 text-center">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Accuracy
          </h3>

          {percentage ? (
            <div className="flex flex-col items-center gap-3">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square h-24 max-h-24 w-24"
              >
                <RadialBarChart
                  data={chartData}
                  startAngle={90}
                  endAngle={90 - percentNum * 3.6}
                  innerRadius={30}
                  outerRadius={42}
                >
                  <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[42, 30]}
                  />
                  <RadialBar
                    dataKey="score"
                    background
                    cornerRadius={8}
                    className="fill-[var(--color-score)]"
                  />
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (
                          !viewBox ||
                          !("cx" in viewBox) ||
                          !("cy" in viewBox)
                        ) {
                          return null;
                        }

                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-lg font-bold"
                            >
                              {percentage}
                            </tspan>
                          </text>
                        );
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
              </ChartContainer>

              {/* Score */}
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {questions}
                </span>
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
    </Card>
  );
}

export default NavControlResults;
