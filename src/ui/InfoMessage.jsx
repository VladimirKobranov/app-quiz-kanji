import React from "react";
function InfoMessage() {
  return (
    <div className="w-full md:w-[500px] p-4 md:p-0">
      <p className="text-[30px] md:text-[30px] text-primary/60 mb-5 font-bold">
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
          A <span className="text-primary font-bold">blue card</span> indicates
          a correct answer, while a{" "}
          <span className="text-destructive font-bold">red card</span> indicates
          an incorrect one. Press "Results" to see your accuracy.
        </p>
        <p>Press "Reset" to start over.</p>
        <p className="font-bold">Good luck!</p>
      </div>
      <p className="text-[50px] md:text-[50px] text-primary mt-8 font-bold">
        頑張って!
      </p>
    </div>
  );
}

export default InfoMessage;
