import React, { useEffect, useState } from "react";
import style from "../css/App.module.css";
import KanjiCard from "./KanjiCard";
import Content from "../css/contentField.module.css";
import { useStore } from "../store/useStore";
import InfoMessage from "./InfoMessage";
import kanjiData from "../data/kanji.json";
import { BrowserView, isBrowser, MobileView } from "react-device-detect";
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
    <div className="flex flex-col gap-0">
      <div className={`w-full ${isBrowser ? "h-[160px]" : "h-[80px]"}`}>
        <BrowserView>
          <div className="flex items-center gap-2">
            <p
              className={
                isBrowser ? style.SelectedLevel : style.SelectedLevelMobile
              }
            >
              {jlptLevelFilter.length
                ? "N" + jlptLevelFilter.join(", N")
                : "Select level"}
            </p>
            <p
              className={
                isBrowser ? style.SelectedInputs : style.SelectedInputsMobile
              }
            >
              {inputsFromRedux.length
                ? inputsFromRedux.join(", ")
                : "Select inputs"}
            </p>
          </div>
        </BrowserView>
        <MobileView>
          <div className="flex flex-col items-center gap-1">
            <p className={style.SelectedLevelMobile}>
              {jlptLevelFilter.length
                ? "N" + jlptLevelFilter.join(", N")
                : "Select level"}
            </p>
            <p className={style.SelectedInputsMobile}>
              {inputsFromRedux.length
                ? inputsFromRedux.join(", ")
                : "Select inputs"}
            </p>
            {levelsFromRedux.length === 0 ? (
              ""
            ) : (
              <div className={style.hintButtonMobile}>
                <Button
                  onClick={handleHintClick}
                  className="bg-[#d9d7dc] hover:bg-[#c2c0c5] text-[30px] h-[60px] w-[60px] rounded-full relative left-20 top-[-4px]"
                >
                  ?
                </Button>
              </div>
            )}
          </div>
        </MobileView>
      </div>
      <ScrollArea
        className={`w-full ${isBrowser ? "h-[76vh]" : "h-[80vh]"} ${Content.scroll}`}
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-x-2.5 gap-y-7.5">
          {levelsFromRedux.length === 0 ? (
            <InfoMessage />
          ) : (
            shuffledNames.map(createKanjiCard)
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

export default ContentField;
