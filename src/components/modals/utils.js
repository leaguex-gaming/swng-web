"use client";

const { windowMaxWidth } = require("@/constants/DeviceData");
const { postBackground, theme } = require("@/constants/theme/colors");

export const customStyles = (modalHeight, bottom = 0) => {
  return {
    overlay: {
      backgroundColor: "transparent",
    },
    content: {
      width: windowMaxWidth,
      height: modalHeight,
      left: "50%",
      top: window.innerHeight - modalHeight - bottom,
      transform: "translate(-50%, 0)",
      bottom: bottom,
      padding: 0,
      border: 0,
      background: postBackground[theme],
      borderRadius: 0,
    },
  };
};
