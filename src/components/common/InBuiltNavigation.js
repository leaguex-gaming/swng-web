"use client";

import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native-web";
import Back from "../../../public/svg/Back";
// import QuestionMark from "../../assets/SvgComponent/QuestionMark";
// import MoreVertical from "../../assets/SvgComponent/MoreVertical";
// import Close from "../../assets/SvgComponent/Close";
// import SettingsIcon from "../../assets/SvgComponent/bottomNav/SettingsIcon";
import { windowMaxWidth } from "../../constants/DeviceData";
import Polygon from "../../../public/svg/Polygon";

export const PolygonContainer = ({
  children,
  extraContainerStyle,
  onPress = () => {},
  width = 70,
  height = 70,
  rotate = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.polygon}>
      <View
        style={[
          styles.backContainer,
          extraContainerStyle,
          rotate && styles.questionContainer,
        ]}>
        <Polygon />
        <View
          style={{
            position: "absolute",
          }}>
          {children}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const BackButton = ({ closeIcon, onPress = () => {} }) => {
  return (
    <PolygonContainer onPress={onPress}>
      {closeIcon ? (
        <Close height={35} width={35} style={styles.close} />
      ) : (
        <Back width={25} style={styles.back} />
      )}
    </PolygonContainer>
  );
};

const InBuiltNavigation = ({
  loading,
  back = true,
  onBackfunc,
  rightNav = "question",
  onPressRightNav = () => {},
}) => {
  const onBack = () => {
    if (!loading) {
      if (onBackfunc) {
        onBackfunc();
      } else {
        history.back();
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        !back && {
          justifyContent: "flex-end",
        },
      ]}>
      {back && <BackButton onPress={onBack} />}

      {rightNav && (
        <PolygonContainer
          extraContainerStyle={styles.questionContainer}
          onPress={onPressRightNav}>
          {rightNav === "question" ? (
            <QuestionMark style={styles.question} onPress={onPressRightNav} />
          ) : rightNav === "more" ? (
            <MoreVertical style={styles.vertical} onPress={onPressRightNav} />
          ) : rightNav === "settings" ? (
            <SettingsIcon
              width={27}
              height={27}
              style={styles.settings}
              onPress={onPressRightNav}
            />
          ) : (
            <></>
          )}
        </PolygonContainer>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowMaxWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    zIndex: 2,
  },
  backContainer: {
    position: "relative",
    marginTop: -2,
    marginRight: -5,
  },
  back: {
    position: "absolute",
    left: 20,
    top: 15,
  },
  close: {
    position: "absolute",
    left: 15,
    top: 10,
  },
  questionContainer: {
    marginRight: -5,
    marginTop: -2,
    transform: [{ rotateY: "180deg" }, { rotateZ: "-1deg" }],
  },
  question: {
    position: "absolute",
    left: 25,
    top: 14,
    transform: [{ rotateY: "180deg" }],
  },

  vertical: { position: "absolute", top: 16, left: 18 },
  settings: { position: "absolute", top: 16, left: 18 },
});

export default InBuiltNavigation;
