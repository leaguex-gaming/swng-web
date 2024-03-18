"use client";

import React from "react";
import { StyleSheet, Text } from "react-native-web";
import pickBy from "lodash/pickBy";
import { white } from "../../constants/theme/colors";

const MyText = ({
  PSBold,
  pageHeaders,
  inputPlaceholderText,
  commentPlaceholderText,
  commentText,
  buttonText,
  fontSize,
  textTransform,
  textAlign,
  lineHeight,
  bgColor,
  color,
  opacity,
  borderRadius,
  underline,
  strikethrough,
  truncate,
  truncate2,
  truncate3,
  style,
  width,
  children,
  m = 0,
  mh = 0,
  mv = 0,
  mt = 0,
  mb = 0,
  ml = 0,
  mr = 0,
  p = 0,
  ph = 0,
  pv = 0,
  pt = 0,
  pb = 0,
  pl = 0,
  pr = 0,
  fontWeight,
  letterSpacing = 0,
  ...props
}) => {
  /**
   * We use this function to build our textDecorationLine style property.
   * We allow this to be configure through two boolean variables `underline`
   * and `strikethrough`, but the textDecorationLine style property needs
   * a string which controls these two properties, one of:
   * ['none', 'underline', 'line-through', 'underline line-through']
   *
   */
  const resolveTextDecorationLine = () => {
    if (underline && strikethrough) {
      return "underline line-through";
    } else if (underline) {
      return "underline";
    } else if (strikethrough) {
      return "line-through";
    }
    return "none";
  };

  let typography = styles.paragraphText;

  if (pageHeaders) typography = styles.pageHeaders;
  else if (inputPlaceholderText) typography = styles.inputPlaceholderText;
  else if (commentPlaceholderText) typography = styles.commentPlaceholderText;
  else if (buttonText) typography = styles.buttonText;
  else if (commentText) typography = styles.commentText;
  else if (PSBold) typography = styles.PSBold;

  let inlineStyle = {
    width,
    fontSize,
    color: color ? color : "#fff",
    opacity,
    borderRadius,
    textTransform,
    backgroundColor: bgColor ? bgColor : "transparent",
    textAlign: textAlign,
    textTransform: textTransform,
    lineHeight: lineHeight,
    textDecorationLine: resolveTextDecorationLine(),
    marginTop: mt || mv || m,
    marginBottom: mb || mv || m,
    marginLeft: ml || mh || m,
    marginRight: mr || mh || m,
    paddingTop: pt || pv || p,
    paddingBottom: pb || pv || p,
    paddingLeft: pl || ph || p,
    paddingRight: pr || ph || p,
    fontWeight: fontWeight,
    letterSpacing: letterSpacing,
  };

  //To remove undefined or null key value pair form inline style object
  const filterStyle = pickBy(inlineStyle, function (value, key) {
    return !(value === undefined || value === null);
  });

  //To enable ellipsize mode
  const numberOfLines = truncate ? 1 : truncate2 ? 2 : truncate3 ? 3 : 0;
  const ellipsizeMode = truncate || truncate2 || truncate3 ? "tail" : null;

  const className =
    inputPlaceholderText || PSBold
      ? "font-bold"
      : pageHeaders || buttonText
      ? "font-jaguar"
      : "font-regular font-light";

  return (
    <span
      // allowFontScaling={false}
      // numberOfLines={numberOfLines}
      // ellipsizeMode={ellipsizeMode}
      style={StyleSheet.flatten([typography, filterStyle, style])}
      className={className}>
      {children}
    </span>
  );
};

const styles = StyleSheet.create({
  pageHeaders: {
    fontSize: 22,
    fontWeight: "400",
    color: "white",
  },
  paragraphText: {
    fontSize: "2vh",
    color: white,
  },
  inputPlaceholderText: {
    fontSize: "2vh",
  },
  commentPlaceholderText: {
    fontSize: "2vh",
  },
  buttonText: {
    fontWeight: "400",
  },
  PSBold: {
    fontSize: 12,
    color: white,
  },
  commentText: {
    fontSize: 10,
    color: white,
  },
});

export default MyText;
