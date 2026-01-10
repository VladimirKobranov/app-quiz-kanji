import React from "react";
function InfoMessage() {
  return (
    <div className="w-full md:w-[500px]">
      <p className="text-[30px] md:text-[30px] text-[#A6C0D1] mb-5">
        いらっしゃいませ!
      </p>
      <p className="text-[30px] md:text-[20px] text-[#868686] leading-[1.2] mb-5">
        Welcome to the Kanji Quiz App.
        <br />
        Here, you can practice with N5 to N1 Kanji levels, along with their
        meanings and On'yomi and Kun'yomi readings.
      </p>
      <p className="text-[30px] md:text-[20px] text-[#868686] leading-[1.2] mb-5">
        First, select the desired level or even several levels.
        <br />
        Then, input your options. (On'yomi and Kun'yomi readings require a
        Japanese keyboard.)
      </p>
      <p className="text-[30px] md:text-[20px] text-[#868686] leading-[1.2] mb-5">
        A blue card indicates a correct answer, while a red card indicates an
        incorrect one. <br />
        After you're done, press the "Results" button to see your accuracy
        percentage.
      </p>
      <p className="text-[30px] md:text-[20px] text-[#868686] leading-[1.2] mb-5">
        Press the "Reset" button to start over.
      </p>
      <p className="text-[30px] md:text-[20px] text-[#868686] leading-[1.2] mb-5">
        Good luck!
      </p>
      <p className="text-[50px] md:text-[50px] text-[#014A77] mt-5">
        頑張って!
      </p>
    </div>
  );
}

export default InfoMessage;
