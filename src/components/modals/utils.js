"use client";

const { windowMaxWidth } = require("@/constants/DeviceData");
const { postBackground, theme } = require("@/constants/theme/colors");

export const customStyles = (modalHeight) => {
  return {
    overlay: {
      backgroundColor: "transparent",
    },
    content: {
      width: windowMaxWidth,
      height: modalHeight,
      left: "50%",
      top: window.innerHeight - modalHeight,
      transform: "translate(-50%, 0)",
      bottom: 0,
      padding: 0,
      border: 0,
      background: postBackground[theme],
      borderRadius: 0,
    },
  };
};
