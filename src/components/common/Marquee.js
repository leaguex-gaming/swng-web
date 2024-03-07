"use client";

import React from "react";
import { StyleSheet, Text, View } from "react-native-web";
import { marqueeColor } from "../../constants/theme/colors";
import MarqueeText from "./MarqueeText";
import { marqueeDuration } from "../../utils/helpers/helper";

const Marquee = ({
  marqueeText,
  marqueeTextColor = marqueeColor,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <MarqueeText
        style={[styles.marqueeText, { color: marqueeTextColor }]}
        marqueeOnStart={true}
        duration={marqueeDuration(marqueeText)}
        loop
        scroll={false}
        // repeatSpacer={100}
        animationType={"scroll"}
        {...props}>
        <Text>{marqueeText}</Text>
      </MarqueeText>
      {/* <MarqueeText
        style={[styles.marqueeText, {color: marqueeTextColor}]}
        speed={1}
        marqueeOnStart={true}
        loop={true}
        consecutive={true}>
        {marqueeText}
      </MarqueeText> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: "100%",
  },
  marqueeText: {
    fontSize: 120,
    fontWeight: "400",
    color: marqueeColor,
    textTransform: "uppercase",
    marginTop: -15,
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: {
      height: 4,
      width: 0,
    },
    textShadowRadius: 6,
  },
});

export default Marquee;
