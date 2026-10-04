import React, { memo } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GRADES = [1, 2, 3, 4, 5, 6, 8, 9];
const LEVELS = ["5", "4", "3", "2", "1"];

const ChooseFilters = memo(function ChooseFilters() {
  const gradeFilters = useStore((state) => state.gradeFilters);
  const levels = useStore((state) => state.levels);
  const frequencyFilter = useStore((state) => state.frequencyFilter);
  const filterMode = useStore((state) => state.filterMode);
  const setFilterMode = useStore((state) => state.setFilterMode);
  const toggleGradeFilter = useStore((state) => state.toggleGradeFilter);
  const setFrequencyFilter = useStore((state) => state.setFrequencyFilter);
  const addLevel = useStore((state) => state.addLevel);
  const removeLevel = useStore((state) => state.removeLevel);

  const toggleLevel = (level) => {
    if (levels.includes(level)) removeLevel(level);
    else addLevel(level);
  };

  return (
    <Card className="w-full max-w-xs border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-foreground">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          <span>Practice Filters</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <Select value={filterMode} onValueChange={setFilterMode}>
          <SelectTrigger className="h-9 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="jlpt">JLPT level</SelectItem>
            <SelectItem value="grade">School grade</SelectItem>
            <SelectItem value="frequency">Frequency</SelectItem>
          </SelectContent>
        </Select>

        {filterMode === "jlpt" && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              JLPT
            </p>
            <div className="grid grid-cols-5 gap-1.5">
              {LEVELS.map((level) => {
                const selected = levels.includes(level);
                return (
                  <Button
                    key={level}
                    type="button"
                    size="sm"
                    variant={selected ? "default" : "outline"}
                    className="h-9 px-1"
                    onClick={() => toggleLevel(level)}
                  >
                    N{level}
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {filterMode === "grade" && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Grade
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {GRADES.map((grade) => (
                <Button
                  key={grade}
                  type="button"
                  size="sm"
                  variant={gradeFilters.includes(grade) ? "default" : "outline"}
                  className="h-8"
                  onClick={() => toggleGradeFilter(grade)}
                >
                  {grade}
                </Button>
              ))}
            </div>
          </div>
        )}

        {filterMode === "frequency" && (
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Frequency
            </p>
            <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
              <SelectTrigger className="h-9 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any frequency</SelectItem>
                <SelectItem value="top-500">Top 500</SelectItem>
                <SelectItem value="top-1000">Top 1000</SelectItem>
                <SelectItem value="top-1500">Top 1500</SelectItem>
                <SelectItem value="top-3000">Top 3000</SelectItem>
                <SelectItem value="rare">Rare</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardContent>
    </Card>
  );
});

export default ChooseFilters;
