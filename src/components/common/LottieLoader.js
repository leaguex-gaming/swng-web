"use client";

import React from "react";
import Loader from "../../../public/lottie/sports-ball-loader.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(
  () =>
    import("@lottiefiles/react-lottie-player").then((module) => module.Player),
  {
    ssr: false,
  }
);

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

  return (
    <Lottie
      ref={lottieRef}
      src={source}
      style={style}
      autoplay={autoPlay}
      keepLastFrame
      loop={loop}
    />
  );
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
