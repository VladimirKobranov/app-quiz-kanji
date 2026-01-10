import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import style from "./css/App.module.css";
import KanjiCard from "./KanjiCard";
import Content from "./css/contentField.module.css";
import { useStore } from "./store/useStore";
import InfoMessage from "./InfoMessage";
import kanjiData from "./data/kanji.json";
import { BrowserView, isBrowser, MobileView } from "react-device-detect";

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
        setData(kanjiData); // Set the imported data directly
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
    //add to store
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
    console.log(
      "input: ",
      answer,
      answerOn,
      answerKun,
      inputsFromRedux,
      card.readings_kun
    );
    console.log(
      "index from content: ",
      inputsFromRedux.map((x) => x)
    );
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
    console.log("card", card);
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
    <VStack spacing="0">
      <Box w="100%" h={isBrowser ? "160px" : "80px"}>
        <BrowserView>
          <HStack>
            <Text
              className={
                isBrowser ? style.SelectedLevel : style.SelectedLevelMobile
              }
            >
              {jlptLevelFilter.length
                ? "N" + jlptLevelFilter.join(", N")
                : "Select level"}
            </Text>
            <Text
              className={
                isBrowser ? style.SelectedInputs : style.SelectedInputsMobile
              }
            >
              {inputsFromRedux.length
                ? inputsFromRedux.join(", ")
                : "Select inputs"}
            </Text>
          </HStack>
        </BrowserView>
        <MobileView>
          <VStack>
            <Text className={style.SelectedLevelMobile}>
              {jlptLevelFilter.length
                ? "N" + jlptLevelFilter.join(", N")
                : "Select level"}
            </Text>
            <Text className={style.SelectedInputsMobile}>
              {inputsFromRedux.length
                ? inputsFromRedux.join(", ")
                : "Select inputs"}
            </Text>
            {levelsFromRedux.length === 0 ? (
              ""
            ) : (
              <Box className={style.hintButtonMobile}>
                <Button
                  onClick={handleHintClick}
                  bg="#d9d7dc"
                  _hover={{ bg: "#d9d7dc" }}
                  fontSize="30px"
                  height="60px"
                  width="60px"
                  borderRadius="100px"
                  left="80px"
                  top="-4px"
                >
                  ?
                </Button>
              </Box>
            )}
          </VStack>
        </MobileView>
      </Box>
      <Box
        w="100%"
        h={isBrowser ? "76vh" : window.innerHeight * 0.8}
        className={Content.scroll}
      >
        <SimpleGrid
          columns={15}
          spacingX="10px"
          spacingY="30px"
          minChildWidth="100px"
        >
          {levelsFromRedux.length === 0
            ? InfoMessage
            : shuffledNames.map(createKanjiCard)}
        </SimpleGrid>
      </Box>
    </VStack>
  );
}

export default ContentField;
