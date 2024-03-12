import React from "react";
import { View, StyleSheet } from "react-native-web";
import OtpBox from "../../../public/svg/OtpBox";
import { LottieView } from "./LottieLoader";

const Checkbox = ({
  checked = false,
  onPress = () => {},
  width = 30,
  height = 30,
}) => {
  return (
    <View style={styles.container}>
      <OtpBox width={width} height={height} fill={"rgba(255,255,255,0.25)"} />
      {checked && (
        <View style={{ position: "absolute", right: -2 }}>
          <LottieView
            source={require("../../../public/lottie/tickmark.json")}
            autoPlay={true}
            speed={3}
            style={{ height: height, width: width }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderRadius: 4,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Checkbox;
