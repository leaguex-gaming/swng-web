"use client";

import React from "react";
import Lottie from "react-lottie";
import Loader from "../../../public/lottie/sports-ball-loader.json";

export const LottieView = ({
  lottieRef,
  source = Loader,
  loop = false,
  style = { width: "100%", height: "100%" },
  autoPlay = true,
}) => {
  const defaultOptions = {
    loop: loop,
    autoplay: autoPlay,
    animationData: source,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} ref={lottieRef} style={style} />;
};

const LottieLoader = ({ width = 50, height = 50 }) => {
  return (
    <LottieView
      style={{ height: height, width: width }}
      source={require("../../../public/lottie/sports-ball-loader.json")}
      autoPlay={true}
      loop={true}
    />
  );
};

export default LottieLoader;
