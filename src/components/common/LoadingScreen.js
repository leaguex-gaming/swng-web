import React from "react";
import { StyleSheet, View } from "react-native-web";
import LottieLoader from "./LottieLoader";

const LoadingScreen = () => {
  return (
    // <MyBackground>
    <View style={styles.container}>
      {/* <LottieLoader width={150} height={150} /> */}
    </View>
    // </MyBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingScreen;
