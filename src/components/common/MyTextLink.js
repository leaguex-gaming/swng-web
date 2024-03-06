"use client";

import React from "react";
import { Pressable } from "react-native-web";
import Underline from "./Underline";
import { buttonPrimary } from "../../constants/theme/colors";
import MyText from "./MyText";

const MyTextLink = ({
  label,
  fontSize = 14,
  active = true,
  onPress = () => {},
  ml = 0,
  mr,
  mb = 0,
  mt = 0,
  mv,
  mh,
  umt = -2,
  umb = 0,
  uml = 0,
  underlineWidth = 1,
}) => {
  return (
    <Pressable onPress={() => onPress()}>
      <>
        <MyText
          pageHeaders
          textTransform={"uppercase"}
          color={buttonPrimary.dark[0]}
          fontSize={fontSize}
          opacity={active ? 1 : 0.5}
          ml={ml}
          mt={mt}
          mb={mb}>
          {label}
        </MyText>
        <Underline
          mt={umt}
          ml={uml}
          mb={umb}
          opacity={active ? 1 : 0.5}
          underlineWidth={underlineWidth}
        />
      </>
    </Pressable>
  );
};

export default MyTextLink;
