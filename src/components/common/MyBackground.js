import React from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  StyleSheet,
} from "react-native-web";
import { background } from "@/constants/theme/colors";
import { useSelector } from "react-redux";
import { windowMaxWidth } from "@/constants/DeviceData";

const BackgroundWrapper = ({ children, customStyle = { flex: 1 }, colors }) => {
  const { theme } = useSelector((state) => state.common);

  let bgColor = theme === "Dark" ? colors.dark : colors.light;

  if (typeof colors.dark === "string") {
    bgColor = [colors.dark, colors.dark];
  }

  return <>{children}</>;
};

const MyBackground = ({
  inputBox = false,
  height,
  children,
  colors = background,
  keyboardPan = true,
}) => {
  return (
    <>
      {inputBox ? (
        <Pressable
          onPress={() => {
            Keyboard.dismiss();
          }}
          style={[
            styles.commonStyle,
            height
              ? {
                  height: height,
                  width: windowMaxWidth,
                }
              : { flex: 1, width: windowMaxWidth },
          ]}>
          <BackgroundWrapper
            customStyle={height ? { height: "100%" } : { flex: 1 }}
            colors={colors}>
            {children}
          </BackgroundWrapper>
        </Pressable>
      ) : (
        <BackgroundWrapper
          customStyle={[
            styles.commonStyle,
            height
              ? {
                  height: height,
                  width: windowMaxWidth,
                }
              : { flex: 1, width: windowMaxWidth },
          ]}
          colors={colors}>
          {children}
        </BackgroundWrapper>
      )}
    </>
  );
};
export const LinearGradientBackground = ({
  children,
  containerStyle = {},
  colors = ["transparent", "transparent"],
  ...otherProps
}) => {
  return { children };
};

export const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  commonStyle: {
    alignSelf: "center",
    overflow: "hidden",
  },
});

export default MyBackground;
