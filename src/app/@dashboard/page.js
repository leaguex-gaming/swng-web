"use client";

import React, { useState } from "react";
import { View, StyleSheet } from "react-native-web";
import { windowMaxWidth } from "../../constants/DeviceData";
import { white } from "@/constants/theme/colors";

const Feed = () => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.marqueeContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width: windowMaxWidth,
    height: "100vh",
    backgroundColor: white,
  },
  marqueeContainer: {
    position: "absolute",
    zIndex: -1,
    width: "100%",
  },
});

export default Feed;
