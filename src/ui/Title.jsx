import React from "react";
function Title() {
  return (
    <div className="flex flex-col items-center w-full mb-0 md:mb-2.5 mt-0 md:mt-6">
      <div className="flex flex-col items-center gap-5 md:gap-2.5">
        <h1 className="text-[40px] md:text-[35px] font-bold text-primary">
          漢字 クイズ
        </h1>
        <p className="text-[30px] md:text-[20px] font-medium text-muted-foreground">
          KANJI QUIZ
        </p>
      </div>
    </div>
  );
}

export default Title;
