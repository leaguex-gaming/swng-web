"use client";

import React from "react";
import { Pressable } from "react-native-web";
import { throttle } from "lodash";

const ThrottlePressable = ({
  onPress = () => {},
  duration = 100,
  ...props
}) => {
  const throttledOnPress = throttle(onPress, duration);

  return <Pressable onPress={throttledOnPress} {...props} />;
};

export default ThrottlePressable;
