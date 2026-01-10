import React, { useState } from "react";
import { Box, Collapse, Grid, GridItem } from "@chakra-ui/react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import ContentField from "./ContentField";
import { BrowserView, MobileView } from "react-device-detect";
import Icon from "@mdi/react";
import { mdiDotsHorizontal } from "@mdi/js";

function Main() {
  const [show, setShow] = useState(false);
  const [display, setDisplay] = useState("");
  const [buttonColor, setButtonColor] = useState("#E6E1E7");
  const [buttonTextColor, setButtonTextColor] = useState("#01111FFF");

  const handleToggle = () => {
    setShow(!show);
    setDisplay(display === "none" ? "" : "none");
    setButtonColor(buttonColor === "#E6E1E7" ? "#014A77FF" : "#E6E1E7");
    setButtonTextColor(
      buttonTextColor === "#01111FFF" ? "#E6E1E7FF" : "#01111FFF",
    );
  };

  return (
    <Box>
      <BrowserView>
        <Grid
          templateAreas={`"nav main" "footer footer" `}
          gridTemplateRows="1fr 38px"
          gridTemplateColumns="213px 1fr"
          height="100%"
          color="blackAlpha"
          margin="10px"
        >
          <GridItem area="nav" width="213px" height="94vh">
            <NavBar />
          </GridItem>
          <GridItem area="main" gridRow="span 1">
            <ContentField />
          </GridItem>
          <GridItem pl="2" area="footer">
            <Footer />
          </GridItem>
        </Grid>
      </BrowserView>
      <MobileView>
        <Box w="auto" h="90%" m="20px">
          <Box
            position="absolute"
            w="60px"
            h="60px"
            color="#101920"
            bg={buttonColor}
            borderRadius="50px"
            top="4px"
            right="5%"
            onClick={handleToggle}
          >
            <Icon
              path={mdiDotsHorizontal}
              size={"60px"}
              color={buttonTextColor}
            />
          </Box>
          <Box>
            <Collapse in={show}>
              <NavBar />
            </Collapse>
            <Box display={display}>
              <ContentField />
            </Box>
          </Box>
          <Footer />
        </Box>
      </MobileView>
    </Box>
  );
}

export default Main;
