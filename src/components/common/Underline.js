"use client";

import React from "react";
import { View, StyleSheet } from "react-native-web";
import { buttonPrimary } from "../../constants/theme/colors";

const Underline = ({ mt = -5, mb = 0, opacity = 1, underlineWidth = 1 }) => {
  return (
    <View
      style={[
        styles.underline,
        {
          marginTop: mt,
          marginBottom: mb,
          opacity: opacity,
          borderBottomWidth: underlineWidth,
        },
      ]}></View>
  );
};

const styles = StyleSheet.create({
  underline: {
    borderBottomColor: buttonPrimary.dark[0],
  },
});

export default Underline;
