import React from "react";
import { Badge } from "@/components/ui/badge";

function InfoMessage() {
  return (
    <div className="w-full md:w-125 p-4">
      <p className="text-[30px] md:text-[30px] mb-2 font-bold">
        いらっしゃいませ!
      </p>
      <div className="space-y-4 text-[20px] md:text-[18px] text-muted-foreground leading-relaxed font-medium">
        <p>
          Welcome to the Kanji Quiz App.
          <br />
          Practice with N5 to N1 Kanji levels, along with their meanings and
          readings (On'yomi and Kun'yomi).
        </p>
        <p>
          First, select the level(s) you want to study. Then choose your inputs.
          (Note: On'yomi and Kun'yomi require a Japanese keyboard.)
        </p>
        <p>
          A <Badge>black card</Badge> indicates a correct answer, while a{" "}
          <Badge variant="destructive">red card</Badge> indicates an incorrect
          one. Press <Badge>Results</Badge> to see your accuracy.
        </p>
        <p>
          Press <Badge variant="destructive">Reset</Badge> to start over.
        </p>
        <p className="font-bold">Good luck!</p>
      </div>
      <p className="text-[50px] md:text-[50px] text-primary mt-2 font-bold">
        頑張って!
      </p>
    </div>
  );
}

export default InfoMessage;
