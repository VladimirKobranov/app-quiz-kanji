import React, { useEffect, useState } from "react";
import style from "../css/App.module.css";
import KanjiCard from "./KanjiCard";
import Content from "../css/contentField.module.css";
import { useStore } from "../store/useStore";
import InfoMessage from "./InfoMessage";
import kanjiData from "../data/kanji.json";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

function ContentField() {
  const levelsFromRedux = useStore((state) => state.levels);
  const inputsFromRedux = useStore((state) => state.inputs);
  const addAnswer = useStore((state) => state.addAnswer);
  const toggleHint = useStore((state) => state.toggleHint);

  const [names, setNames] = useState([]);
  const [data, setData] = useState({});
  const [jlptLevelFilter, setJlptLevelFilter] = useState([]);

  const handleHintClick = () => {
    toggleHint();
    console.log("hint dispatch");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(kanjiData);
        const kanjiNames = Object.keys(kanjiData);
        setNames(kanjiNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const parsedLevels = levelsFromRedux.map((level) => parseInt(level, 10));
    setJlptLevelFilter(parsedLevels);
  }, [levelsFromRedux]);

  const filteredNames = names.filter((name) => {
    const kanjiData = data[name];
    return kanjiData && jlptLevelFilter.includes(kanjiData.jlpt_new);
  });
  const shuffledNames = [...filteredNames];
  for (let i = shuffledNames.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledNames[i], shuffledNames[j]] = [shuffledNames[j], shuffledNames[i]];
  }

  function validateCard(kanji, value) {
    const card = { meanings: [] };
    card.meanings = data[kanji].meanings;
    card.readings_on = data[kanji].readings_on;
    card.readings_kun = data[kanji].readings_kun;
    const meaningsString = card.meanings.join(",");
    const answer = card.meanings.some(
      (key) =>
        key.toUpperCase() === value.trim().toUpperCase() &&
        inputsFromRedux.includes("meaning")
    );
    const answerOn = card.readings_on.some(
      (key) =>
        key.toUpperCase() === value.trim().toUpperCase() &&
        inputsFromRedux.includes("reading-on")
    );
    const answerKun = card.readings_kun.some(
      (key) =>
        key.toUpperCase() === value.trim().toUpperCase() &&
        inputsFromRedux.includes("reading-kun")
    );
    const readings_on = card.readingOn;
    const readings_kun = card.readingKun;
    let answersTrue = false;

    if (answer || answerOn || answerKun) {
      answersTrue = true;
    }

    addAnswer({
      kanji,
      input: value,
      correct: answer,
      correctOn: answerOn,
      correctKun: answerKun,
      meaning: meaningsString,
      readingOn: readings_on,
      readingKun: readings_kun,
    });
    return answersTrue;
  }

  function createKanjiCard(name) {
    return (
      <KanjiCard
        key={(Math.random() + 1).toString(32).substring(7)}
        textCol="black"
        kanji={name}
        validation={validateCard}
        index={inputsFromRedux.map((x) => x)}
        cardMeaning={data[name].meanings}
        cardOn={data[name].readings_on}
        cardKun={data[name].readings_kun}
      />
    );
  }

  return (
    <div className="flex flex-col gap-0 h-full bg-background text-foreground">
      <div className="w-full h-[80px] md:h-[160px] flex items-center px-4">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 w-full">
          <p className="text-[24px] md:text-[40px] font-bold text-muted-foreground truncate">
            {jlptLevelFilter.length
              ? "N" + jlptLevelFilter.join(", N")
              : "Select level"}
          </p>
          <p className="text-[14px] md:text-[20px] text-muted-foreground/60 truncate italic">
            {inputsFromRedux.length
              ? inputsFromRedux.join(", ")
              : "Select inputs"}
          </p>
          {/* Hint button for mobile only */}
          {levelsFromRedux.length !== 0 && (
            <div className="md:hidden absolute top-[10px] right-[75px] z-40">
              <Button
                variant="secondary"
                size="icon"
                onClick={handleHintClick}
                className="text-[24px] h-[50px] w-[50px] rounded-full shadow-sm"
              >
                ?
              </Button>
            </div>
          )}
        </div>
      </div>
      <ScrollArea className={`w-full flex-1 ${Content.scroll}`}>
        {levelsFromRedux.length === 0 ? (
          <InfoMessage />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-2.5 gap-y-7.5 p-4">
            {shuffledNames.map(createKanjiCard)}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default ContentField;
