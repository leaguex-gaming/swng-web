"use client";

import React from "react";
import { View, StyleSheet } from "react-native-web";
import MyText from "../common/MyText";
import TrendingIcon from "../../../public/svg/community/tags/TrendingIcon";
import ThrottlePressable from "../common/ThrottlePressable";
import Kabaddi from "../../../public/svg/Kabaddi";

const Tag = ({
  name = "Trending",
  iconBackgroundColor = "#FF7A7A",
  type,
  marginRight = 8,
  onPress = () => {},
  subtopic_id,
  topic_id,
  sport_name,
  selected = false,
  image_url,
}) => {
  let lessOpacityBG = `${iconBackgroundColor}77`;
  let unSelectedBG = `${iconBackgroundColor}33`;
  let unSelectedLessOPacityBG = `${iconBackgroundColor}55`;
  return (
    <ThrottlePressable onPress={onPress}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: lessOpacityBG,
            marginRight: marginRight,
            transform: [{ scale: type == "small" ? 0.8 : 1 }],
            opacity: selected ? 1 : 0.3,
          },
        ]}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: lessOpacityBG,
            },
          ]}>
          {name === "Trending" ? (
            <TrendingIcon
              width={type === "small" ? 10 : 14}
              height={type === "small" ? 10 : 14}
              opacity={selected ? 1 : 0.3}
            />
          ) : topic_id == 4 ? (
            <Kabaddi
              width={type === "small" ? 10 : 14}
              height={type === "small" ? 10 : 14}
              opacity={selected ? 1 : 0.3}
            />
          ) : (
            <img
              src={image_url}
              width={type === "small" ? 10 : 15}
              height={type === "small" ? 10 : 15}
            />
          )}
          {type === "small" && (
            <MyText
              fontSize={10}
              ml={1}
              buttonText
              textTransform={"capitalize"}>
              {sport_name}
            </MyText>
          )}
        </View>

        <View
          style={[
            styles.textContainer,
            {
              backgroundColor: iconBackgroundColor,
              paddingVertical: type === "small" ? 2 : 4,
              paddingRight: type === "small" ? 6 : 10,
            },
          ]}>
          <MyText
            buttonText
            color={"black"}
            fontSize={type === "small" ? 12 : 14}>
            {name}
          </MyText>
        </View>
      </View>
    </ThrottlePressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 2,
    flexDirection: "row",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderRadius: 2,
  },
  textContainer: {
    paddingLeft: 4,
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
  },
});

export default Tag;
