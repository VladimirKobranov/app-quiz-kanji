"use client";
import React, { memo, useCallback } from "react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Check } from "lucide-react";

const LEVELS = [
  { index: "5", name: "N5", description: "Beginner" },
  { index: "4", name: "N4", description: "Elementary" },
  { index: "3", name: "N3", description: "Intermediate" },
  { index: "2", name: "N2", description: "Upper-Intermediate" },
  { index: "1", name: "N1", description: "Advanced" },
];

const ChooseLevel = memo(function ChooseLevel() {
  const levels = useStore((state) => state.levels);
  const addLevel = useStore((state) => state.addLevel);
  const removeLevel = useStore((state) => state.removeLevel);

  const handleClick = useCallback(
    (index) => {
      if (levels.includes(index)) {
        removeLevel(index);
      } else {
        addLevel(index);
      }
    },
    [levels, removeLevel, addLevel],
  );

  return (
    <Card className="w-full max-w-xs border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <GraduationCap className="h-5 w-5 text-primary" />
          <span>Choose Levels</span>
          <span className="text-xs text-muted-foreground font-normal ml-auto">
            {levels.length} selected
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-col gap-2">
          {LEVELS.map((level) => {
            const isSelected = levels.includes(level.index);
            return (
              <Button
                key={level.index}
                variant={isSelected ? "default" : "outline"}
                className={`w-full justify-between h-12 transition-all ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-accent hover:border-primary/50"
                }`}
                onClick={() => handleClick(level.index)}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg">{level.name}</span>
                  <span
                    className={`text-xs ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    {level.description}
                  </span>
                </div>
                {isSelected && <Check className="h-4 w-4" />}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
});

export default ChooseLevel;
