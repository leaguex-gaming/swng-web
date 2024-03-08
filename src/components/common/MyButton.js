import React, { useState } from "react";
import { Pressable, StyleSheet, View, Keyboard } from "react-native-web";
import MyText from "./MyText";
import { black, white } from "@/constants/theme/colors";
import ButtonBGFull from "../../../public/svg/ButtonBG";
import ButtonHalf from "../../../public/svg/ButtonHalf";
import { windowMaxHeight, windowMaxWidth } from "@/constants/DeviceData";
import { LottieView } from "./LottieLoader";

/**
 * The `MyButton` function is a custom button component in JavaScript that allows for customization of
 * various button properties such as label, width, height, onPress action, loading state, disabled
 * state, button type, background color, and button color.
 * @returns The `MyButton` component is being returned.
 */
const MyButton = ({
  label = "label",
  width = 294,
  height = 48,
  buttonTextSize = 18,
  onPress = () => {},
  loading = false,
  mv = 0,
  disabled = false,
  type = "primary",
  debounceTime = 1000,
  debounceFunc = true,
  disabledStatePressAction = () => {},
  backgroundColor,
  buttonColor = "black",
  iconComponent = null,
  disableOpacity = 0.3,
}) => {
  const buttonColors = {
    black: black,
    white: white,
  };

  const [containerSize, setContainerSize] = useState({
    width: width,
    height: height,
  });

  const disabledOpacity = disabled ? disableOpacity : 1;

  return (
    <>
      <View
        style={[styles.container]}
        onLayout={(x) => {
          setContainerSize({
            width: x.nativeEvent.layout.width,
            height: x.nativeEvent.layout.height,
          });
        }}>
        <View>
          <ButtonBGFull
            width={width}
            height={height}
            opacity={disabledOpacity}
            type={type}
            color={backgroundColor}
          />
        </View>
        {/* <View style={[styles.card]}>
          <ButtonBGFull
            width={width}
            height={height}
            stroke={!loading && type === "transparent" ? "white" : ""}
            strokeWidth={!loading && type === "transparent" ? 2 : 0}
            opacity={disabledOpacity}
            type={type}
          />
        </View> */}

        {!loading ? (
          <Pressable
            style={[styles.card, styles.buttonTextContainer]}
            onPress={() => {
              if (disabled) {
                disabledStatePressAction();
              } else {
                Keyboard.dismiss();
                onPress();
              }
            }}>
            {iconComponent}
            <MyText
              textTransform={"uppercase"}
              buttonText
              fontSize={
                windowMaxWidth === 500
                  ? 20
                  : (windowMaxHeight / 640) * buttonTextSize
              }
              opacity={disabled ? 0.5 : 1}
              color={buttonColors[buttonColor] || black}>
              {label}
            </MyText>
          </Pressable>
        ) : (
          <LottieView
            style={styles.lottieContainer}
            source={require("../../../public/lottie/btn-loader.json")}
            autoPlay={true}
            loop={true}
            resizeMode="cover"
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    elevation: 40,
    shadowColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextContainer: {
    flexDirection: "row",

    zIndex: 25,
  },
  disabledStyle: {
    // backgroundColor: "rgba(255,255,255,0.4)",
    zIndex: 26,
  },
  lottieContainer: {
    position: "absolute",
    width: 100,
    height: 25,
  },
});

export default MyButton;
