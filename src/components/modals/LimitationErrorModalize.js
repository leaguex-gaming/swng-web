import React from "react";
import { View, StyleSheet } from "react-native-web";
import MyText from "../common/MyText";
import { windowMaxHeight, windowMaxWidth } from "@/constants/DeviceData";
import MyButton from "../common/MyButton";

const LimitationErrorModalize = ({ setshowLimitation, limitationMessage }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <MyText pageHeaders mv={5}>
          File Size Error !
        </MyText>
        <MyText textAlign={"center"} pb={20} opacity={0.8}>
          {limitationMessage}
        </MyText>

        <View style={styles.buttonContainer}>
          <MyButton
            label="OKAY"
            type="tertiary"
            width={(windowMaxWidth - 140) / 2}
            height={40}
            mv={10}
            onPress={() => {
              setshowLimitation(false);
            }}
            buttonTextSize={14}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    position: "absolute",
    top: 0,
    height: windowMaxHeight,
    width: windowMaxWidth,
    backgroundColor: "#000000BB",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    marginHorizontal: 20,
    backgroundColor: "#1B1B1B",
    padding: 20,
    paddingVertical: 40,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#EF6D6D",
  },
  buttonContainer: {
    width: windowMaxWidth - 120,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: -30,
  },
});

export default LimitationErrorModalize;
