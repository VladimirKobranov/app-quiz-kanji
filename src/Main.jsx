import React, { Suspense, useContext, useEffect, useState } from "react";
import { StoreContext } from "./store";
import data from "./data.js";
import KanjiCard from "./KanjiCard";
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  ListItem,
  Tag,
  Text,
  UnorderedList,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import "./style.css";
import Footer from "./Footer";

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function Main() {
  const { storeState, setStoreState } = useContext(StoreContext);
  const { results, makeResults } = useContext(StoreContext);
  const { reset } = useContext(StoreContext);
  const { setLevel } = useContext(StoreContext);
  const { setInput } = useContext(StoreContext);
  const { hintMode, setHintMode } = useContext(StoreContext);
  const [inputVal, setInputVal] = useState("");
  const [shuffledKanjiData, setShuffledKanjiData] = useState([]);

  useEffect(() => {
    const kanjiData = Object.keys(data).filter(
      (key) => data[key]["jlpt_new"] === storeState.jlpt,
    );
    const shuffledData = shuffleArray(kanjiData);
    setShuffledKanjiData(shuffledData);
  }, [storeState.jlpt]);

  useEffect(() => {
    const newData = shuffledKanjiData.map((key) => ({
      kanji: key,
      meanings: data[key].meanings,
      readings_on: data[key].readings_on,
      readings_kun: data[key].readings_kun,
    }));

    setStoreState((prevState) => ({
      ...prevState,
      data: newData,
    }));
  }, [shuffledKanjiData, setStoreState]);

  function handleResults() {
    makeResults();
  }

  function handleReset() {
    setInputVal("");
    reset();
  }

  function handleSelectLevel(index) {
    return () => {
      if (storeState.answers.length > 0) {
        handleReset();
      }
      setLevel(index);
    };
  }

  function handleSelectInput(type) {
    return () => {
      if (storeState.answers.length > 0) {
        handleReset();
      }
      setInput(type);
    };
  }

  function handleHintMode() {
    setHintMode(!hintMode);
    console.log("store hint:", hintMode);
  }

  function handleInputChange(kanjiIndex, newVal) {
    const currentKanjiData = storeState.data[kanjiIndex];
    const cleanedInput = newVal.trim();
    const mode = storeState.input;

    let isCorrect;
    if (mode === "meanings") {
      isCorrect = currentKanjiData[mode]
        .map((meaning) => meaning.toLowerCase())
        .includes(cleanedInput.toLowerCase());
    } else {
      isCorrect = currentKanjiData[mode].includes(cleanedInput);
    }

    setStoreState((prevState) => {
      const updatedAnswers = [...prevState.answers];
      updatedAnswers[kanjiIndex] = newVal;
      const updatedResults = [...prevState.results];
      updatedResults[kanjiIndex] = isCorrect;
      return {
        ...prevState,
        answers: updatedAnswers,
        results: updatedResults,
      };
    });
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box m="10px">
      <Icon
        className="menuIcon"
        path={mdiMenu}
        size={2}
        onClick={onOpen}
        ref={btnRef}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <Icon
            path={mdiMenu}
            size={2}
            onClick={onClose}
            className="menuIcon"
          />
          <DrawerHeader p="0">
            <Center>
              <VStack mt="10px">
                <Text className="TitleKanji">漢字 クイズ</Text>
                <Text className="TitleMain">Kanji Quiz</Text>
              </VStack>
            </Center>
          </DrawerHeader>
          <DrawerBody>
            <VStack>
              <Box mb="10px">
                <VStack>
                  <Text className="HeaderMain">Choose level</Text>
                  <Button
                    onClick={handleSelectLevel(5)}
                    className="button"
                    bg={storeState.jlpt === 5 ? "#014A77FF" : "#e6e1e7"}
                    color={storeState.jlpt === 5 ? "#ffffff" : "#868686"}
                    _hover={
                      storeState.jlpt === 5
                        ? { bg: "#014A77FF" }
                        : { bg: "#e6e1e7" }
                    }
                  >
                    level 5
                  </Button>
                  <Button
                    onClick={handleSelectLevel(4)}
                    className="button"
                    bg={storeState.jlpt === 4 ? "#014A77FF" : "#e6e1e7"}
                    color={storeState.jlpt === 4 ? "#ffffff" : "#868686"}
                    _hover={
                      storeState.jlpt === 5
                        ? { bg: "#014A77FF" }
                        : { bg: "#e6e1e7" }
                    }
                  >
                    level 4
                  </Button>
                  <Button
                    onClick={handleSelectLevel(3)}
                    className="button"
                    bg={storeState.jlpt === 3 ? "#014A77FF" : "#e6e1e7"}
                    color={storeState.jlpt === 3 ? "#ffffff" : "#868686"}
                    _hover={
                      storeState.jlpt === 5
                        ? { bg: "#014A77FF" }
                        : { bg: "#e6e1e7" }
                    }
                  >
                    level 3
                  </Button>
                  <Button
                    onClick={handleSelectLevel(2)}
                    className="button"
                    bg={storeState.jlpt === 2 ? "#014A77FF" : "#e6e1e7"}
                    color={storeState.jlpt === 2 ? "#ffffff" : "#868686"}
                    _hover={
                      storeState.jlpt === 5
                        ? { bg: "#014A77FF" }
                        : { bg: "#e6e1e7" }
                    }
                  >
                    level 2
                  </Button>
                  <Button
                    onClick={handleSelectLevel(1)}
                    className="button"
                    bg={storeState.jlpt === 1 ? "#014A77FF" : "#e6e1e7"}
                    color={storeState.jlpt === 1 ? "#ffffff" : "#868686"}
                    _hover={
                      storeState.jlpt === 5
                        ? { bg: "#014A77FF" }
                        : { bg: "#e6e1e7" }
                    }
                  >
                    level 1
                  </Button>
                </VStack>
              </Box>

              <Box mb="10px">
                <VStack>
                  <Text className="HeaderMain">Choose input</Text>
                  <Button
                    onClick={handleSelectInput("meanings")}
                    bg={
                      storeState.input === "meanings" ? "#014A77FF" : "#e6e1e7"
                    }
                    color={
                      storeState.input === "meanings" ? "#ffffff" : "#868686"
                    }
                    _hover={
                      storeState.jlpt === 5
                        ? { bg: "#014A77FF" }
                        : { bg: "#e6e1e7" }
                    }
                    className="button"
                  >
                    meanings
                  </Button>
                  <Button
                    onClick={handleSelectInput("readings_on")}
                    bg={
                      storeState.input === "readings_on"
                        ? "#014A77FF"
                        : "#e6e1e7"
                    }
                    color={
                      storeState.input === "readings_on" ? "#ffffff" : "#868686"
                    }
                    _hover={
                      storeState.jlpt === 5
                        ? { bg: "#014A77FF" }
                        : { bg: "#e6e1e7" }
                    }
                    className="button"
                  >
                    onyomi
                  </Button>
                  <Button
                    onClick={handleSelectInput("readings_kun")}
                    bg={
                      storeState.input === "readings_kun"
                        ? "#014A77FF"
                        : "#e6e1e7"
                    }
                    color={
                      storeState.input === "readings_kun"
                        ? "#ffffff"
                        : "#868686"
                    }
                    _hover={
                      storeState.jlpt === 5
                        ? { bg: "#014A77FF" }
                        : { bg: "#e6e1e7" }
                    }
                    className="button"
                  >
                    Kunyomi
                  </Button>
                </VStack>
              </Box>

              <Box>
                <VStack>
                  <Button
                    onClick={handleHintMode}
                    bg={hintMode ? "#014A77FF" : "#e6e1e7"}
                    color={hintMode ? "#ffffff" : "#868686"}
                    _hover={
                      storeState.jlpt === 5
                        ? { bg: "#014A77FF" }
                        : { bg: "#e6e1e7" }
                    }
                    className="button"
                  >
                    hint mode
                  </Button>
                  <Button
                    onClick={handleReset}
                    className="button"
                    bg="#AF282F"
                    color="#ffffff"
                  >
                    reset
                  </Button>
                  <Button
                    onClick={handleResults}
                    className="button"
                    bg="#014A77FF"
                    color="#ffffff"
                    mb="10px"
                    _hover={
                      storeState.jlpt === 5
                        ? { bg: "#014A77FF" }
                        : { bg: "#e6e1e7" }
                    }
                  >
                    results
                  </Button>
                  <Text className="HeaderMain">Accuracy</Text>
                  <Text className="results">
                    {results
                      ? `${results.correct}/${results.total}/${results.percentage}%`
                      : null}
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </DrawerBody>
          <DrawerFooter>
            <Footer />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Suspense fallback={<Text>loading...</Text>}>
        <Box mb="10px">
          <VStack alignItems="start">
            <Text className="SelectedLevel">
              {storeState.data.length === 0
                ? "Select level"
                : `N${storeState.jlpt}`}
            </Text>
            <Text className="SelectedInput">
              {storeState.data.length === 0
                ? "Select input"
                : storeState.input === "meanings"
                  ? "meanings"
                  : storeState.input === "readings_on"
                    ? "onyomi"
                    : storeState.input === "readings_kun"
                      ? "kunyomi"
                      : "Unknown input type"}
            </Text>

            <Text className="hint">{hintMode ? "Hint mode" : null}</Text>
          </VStack>
        </Box>
        <Center>
          {storeState.data.length === 0 ? (
            <Box fontSize="sm">
              <Text className="wellcomeTitle" mb="20px">
                Welcome to Kanji Quiz!
              </Text>
              Hello there! 🎉 Get ready to challenge your knowledge of Japanese{" "}
              <Tag bg="#AF282F" color="#ffffff">
                Kanji
              </Tag>{" "}
              characters. Follow these simple steps to start your quiz:
              <UnorderedList className="wellcomeList" mt="20px" mb="20px">
                <ListItem>
                  Select JLPT{" "}
                  <Tag bg="#AF282F" color="#ffffff">
                    Level
                  </Tag>{" "}
                  to Begin: If you're new here or want to start fresh, hit the{" "}
                  <Tag bg="#AF282F" color="#ffffff">
                    Reset
                  </Tag>{" "}
                  button to clear previous results and set your quiz to default
                  settings.
                </ListItem>
                <ListItem>
                  Select{" "}
                  <Tag bg="#014A77FF" color="#ffffff">
                    Input
                  </Tag>{" "}
                  Type: Decide whether you want to focus on meanings, onyomi
                  readings, or kunyomi readings during the quiz. Click the
                  corresponding button to make your selection.
                </ListItem>
                <ListItem>
                  Need a little extra help? Toggle the{" "}
                  <Tag bg="#014A77FF" color="#ffffff">
                    Hint Mode
                  </Tag>{" "}
                  on to reveal additional information about each kanji
                  character.
                </ListItem>
                <ListItem>
                  Once you've finished, press{" "}
                  <Tag bg="#014A77FF" color="#ffffff">
                    Results
                  </Tag>{" "}
                  to reveal your results.
                </ListItem>
              </UnorderedList>
              <Text className="wellcomeEnd">
                Happy learning, and enjoy your Kanji Quiz experience! 📚🀄
              </Text>
            </Box>
          ) : null}
          <Grid
            templateColumns="repeat(4, 1fr)"
            gap={3}
            className={hintMode ? "gridFieldHint" : "gridField"}
          >
            {storeState.data.map((kanjiData, index) => (
              <GridItem key={index}>
                <KanjiCard
                  key={index}
                  index={index}
                  kanji={kanjiData.kanji}
                  meanings={kanjiData.meanings}
                  readings_on={kanjiData.readings_on}
                  readings_kun={kanjiData.readings_kun}
                  onInputChange={(newValue) =>
                    handleInputChange(index, newValue)
                  }
                  defaultValue={inputVal}
                  isCorrect={
                    storeState.results ? storeState.results[index] : null
                  }
                />
              </GridItem>
            ))}
          </Grid>
        </Center>
      </Suspense>
    </Box>
  );
}
