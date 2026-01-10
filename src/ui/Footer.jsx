import React from "react";
import { Center, Link, Text } from "@chakra-ui/react";
import style from "../css/Footer.module.css";

const d = new Date();
let year = d.getFullYear();

const link = () => (
  <Link href="https://github.com/VladimirKobranov">copyright VK</Link>
);

function Footer() {
  return (
    <Center w="100%">
      <Text className={style.footer} w="auto">
        {link()}&nbsp;|&nbsp;{year}
      </Text>
    </Center>
  );
}

export default Footer;

