"use client";

import React from "react";
import { View, StyleSheet } from "react-native-web";
import MyText from "./MyText";

const Header = ({
  headerText,
  height,
  backgroundColor = "transparent",
  leftComponent,
  centerComponent,
  rightComponent,
  containerStyle = {},
}) => {
  return (
    <View style={[styles.container, { height: height }, containerStyle]}>
      <View
        style={[
          styles.backgroundContainer,
          {
            backgroundColor: backgroundColor,
          },
        ]}></View>
      <View style={[styles.flex, styles.flexLeftDirectionRow]}>
        {leftComponent}
        <View style={styles.flex}></View>
      </View>
      <View style={styles.headerTextContainer}>
        {centerComponent}
        {headerText && (
          <MyText pageHeaders textTransform={"uppercase"}>
            {headerText}
          </MyText>
        )}
      </View>
      <View style={[styles.flex, styles.flexDirectionRow]}>
        <View style={styles.flex}></View>

        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    position: "relative",
    zIndex: 1,
  },
  headerTextContainer: {
    position: "relative",
    bottom: 8,
  },
  flex: {
    flex: 1,
  },
  flexLeftDirectionRow: {
    flexDirection: "row",
    marginLeft: -5,
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  backgroundContainer: {
    position: "absolute",
    width: "100%",
    height: 54,
    top: 0,
  },
});

export default Header;
