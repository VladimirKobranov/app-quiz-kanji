import React, { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import style from "../css/KanjiCard.module.css";
import { useStore } from "../store/useStore";

function KanjiCard(props) {
  const inputsFromRedux = useStore((state) => state.inputs);
  const hintState = useStore((state) => state.hint);

  const [color, setColor] = useState("#E6E1E7");
  const [keyEnter, setKeyEnter] = useState(false);

  const handleChange = (event, index) => {
    const v = event.target.value;
    if (!v) return;
    let valid = props.validation(props.kanji, v);
    console.log("card is valid", valid);
    if (valid) {
      setColor("#014A77");
    } else {
      setColor("#AF282F");
    }
    console.log("index: ", index, inputsFromRedux[index]);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setKeyEnter(true);
      const v = event.target.value;
      if (!v) return;
      let valid = props.validation(props.kanji, v);
      console.log("card is valid", valid);
      if (valid) {
        setColor("#014A77");
      } else {
        setColor("#AF282F");
      }
    }
  };

  const handleHintClick = (index) => {
    console.log("hint clicked", index);
  };

  return (
    <VStack spacing="2px" w="100px" bg={color} rounded="2px">
      <Flex position="relative" right="-30px" top="5px">
        <Collapse in={hintState}>
          <Popover isLazy placement="auto">
            <PopoverTrigger>
              <Button
                rounded="20px"
                size="xs"
                onClick={() => handleHintClick(props)}
                bg="#C2BCC1"
              >
                ?
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton size="lg" color="#FCFCFDFF" />
              <PopoverHeader
                fontSize="lg"
                fontWeight="700"
                bg="#014A77"
                color="#FCFCFDFF"
                rounded="5px"
              >
                Hint
              </PopoverHeader>
              <PopoverBody rounded="5px">
                <Flex>
                  <Box mr="15px" p="5px">
                    <Text className={style.hintHeaderKanji} rounded="2px">
                      {props.kanji}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontWeight="700">Meaning:</Text>
                    <Text>{props.cardMeaning.join(", ")}</Text>
                    <Text fontWeight="700">Onyomi:</Text>
                    <Text>{props.cardOn.join("、 ")}</Text>
                    <Text fontWeight="700">Kunyomi:</Text>
                    <Text>{props.cardKun.join("、")}</Text>
                  </Box>
                </Flex>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Collapse>
      </Flex>
      <Box h="100px" className={style.CardKanji}>
        <Text color={props.textCol}>{props.kanji}</Text>
      </Box>
      <Box h="auto" rounded="2px" className={style.CardText}>
        <VStack spacing="2px">
          {inputsFromRedux.map((inputValue, index) => (
            <Input
              index={props.index}
              key={inputsFromRedux[index]}
              placeholder={inputValue}
              variant="filled"
              className={style.CardText}
              size="sm"
              style={{ width: "100px", height: "29px" }}
              borderRadius="2px"
              textAlign="center"
              bg={color}
              color={props.textCol}
              _placeholder={{ opacity: 0.2, color: "#000000" }}
              focusBorderColor="#E6E1E7"
              _hover={{ backgroundColor: color }}
              _focus={{ backgroundColor: color }}
              onBlur={(event) => (keyEnter ? null : handleChange(event, index))}
              onKeyDown={handleKeyDown}
            />
          ))}
        </VStack>
      </Box>
    </VStack>
  );
}

export default KanjiCard;
